import { initializeApp, getApps } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import {
  getAuth,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";
import {
  getDatabase,
  ref,
  push,
  set,
  update,
  remove,
  get
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyAnk8ApGJZd85R8eT2ryg72jUd90VEyuAQ",
  authDomain: "test-pro-e6152.firebaseapp.com",
  databaseURL: "https://test-pro-e6152-default-rtdb.firebaseio.com",
  projectId: "test-pro-e6152",
  storageBucket: "test-pro-e6152.appspot.com",
  messagingSenderId: "766763484355",
  appId: "1:766763484355:web:db970872019c63a507ce76"
};

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

const form = document.getElementById('shayariForm');
const input = document.getElementById('shayariInput');
const list = document.getElementById('shayariList');
const logoutBtn = document.getElementById('logoutBtn');
const status = document.getElementById('status');
let editingKey = null;

logoutBtn.addEventListener("click", async () => {
  try {
    await signOut(auth);
    status.textContent = "You have been logged out.";
  } catch (error) {
    status.textContent = `Logout error: ${error.message}`;
  }
});

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;

  if (editingKey) {
    await update(ref(db, 'shayaris/' + editingKey), { text });
    editingKey = null;
    window.localStorage.setItem("e01", 'null');
  } else {
    const newRef = push(ref(db, 'shayaris'));
    await set(newRef, { text });
  }

  input.value = '';
  loadShayaris();
});

function loadShayaris() {
  const loader = document.getElementById('pageLoader');
  list.innerHTML = '';

  get(ref(db, 'shayaris')).then((snapshot) => {
    const data = snapshot.val();
    if (data) {
      for (let key in data) {
        const item = data[key];
        const card = document.createElement('div');
        card.className = 'shayari-card';
        card.innerHTML = `
          <div class="shayari-text">${item.text}</div>
          <div class="card-actions">
            <i class="e fa fa-pen edit-btn" data-key="${key}" data-text="${item.text.replace(/"/g, '&quot;')}"></i>
            <i class="e fa fa-trash delete-btn" data-key="${key}"></i>
          </div>
        `;
        list.appendChild(card);
      }

      document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const key = btn.getAttribute('data-key');
          const text = btn.getAttribute('data-text');
          editShayari(key, text);
        });
      });

      document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const key = btn.getAttribute('data-key');
          deleteShayari(key);
        });
      });
    }
  });

  get(ref(db, 'shayari_submissions')).then((snapshot) => {
    const data = snapshot.val();
    if (data) {
      for (let key in data) {
        const item = data[key];
        const card = document.createElement('div');
        card.className = 'shayari-card';
        card.innerHTML = `
  <div class="pending-wrapper">
    <textarea class="pending-edit" id="pending-${key}">${item.text}</textarea>
    <div class="approve-actions">
      <i class="fa fa-check accept-btn" data-key="${key}"></i>
      <i class="fa fa-times reject-btn" data-key="${key}"></i>
    </div>
  </div>
`;

        list.appendChild(card);
      }

      document.querySelectorAll('.accept-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
          const key = btn.getAttribute('data-key');
          const newText = document.getElementById(`pending-${key}`).value;
          const approvedRef = push(ref(db, 'shayaris'));
          await set(approvedRef, { text: newText });
          await remove(ref(db, 'shayari_submissions/' + key));
          loadShayaris();
        });
      });

      document.querySelectorAll('.reject-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
          const key = btn.getAttribute('data-key');
          await remove(ref(db, 'shayari_submissions/' + key));
          loadShayaris();
        });
      });
    }
    setTimeout(() => loader.classList.add('hidden'), 300);
  });
}

function editShayari(key, text) {
  input.value = text;
  editingKey = key;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function deleteShayari(key) {
  if (confirm("Are you sure you want to delete this Shayari?")) {
    remove(ref(db, 'shayaris/' + key)).then(loadShayaris);
  }
}

onAuthStateChanged(auth, user => {
  if (!user) window.location.href = '/auth';
  else loadShayaris();
});

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
}