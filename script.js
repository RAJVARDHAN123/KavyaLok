const firebaseConfig = {
  apiKey: "AIzaSyAnk8ApGJZd85R8eT2ryg72jUd90VEyuAQ",
  authDomain: "test-pro-e6152.firebaseapp.com",
  databaseURL: "https://test-pro-e6152-default-rtdb.firebaseio.com",
  projectId: "test-pro-e6152",
  storageBucket: "test-pro-e6152.appspot.com",
  messagingSenderId: "766763484355",
  appId: "1:766763484355:web:db970872019c63a507ce76"
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();
let allShayaris = {};

function renderShayaris(filteredShayaris) {
  const carouselInner = document.getElementById('carouselInner');
  const fragment = document.createDocumentFragment();

  for (let key in filteredShayaris) {
    const shayari = filteredShayaris[key];

    const card = document.createElement('div');
    card.className = "card swiper-slide";

    const content = document.createElement('div');
content.className = "card-content";

const text = document.createElement('p');
text.className = "description";
text.style.whiteSpace = "pre-line";
text.textContent = shayari.text;

content.appendChild(text);
card.appendChild(content);
fragment.appendChild(card);

// Detect if scroll is needed AFTER it's rendered
requestAnimationFrame(() => {
  if (content.scrollHeight > content.clientHeight + 10) {
    content.classList.add("scrollable");
  }
});

  }

  carouselInner.innerHTML = "";
  carouselInner.appendChild(fragment);

  new Swiper(".slide-content", {
    slidesPerView: 3,
    spaceBetween: 25,
    loop: true,
    centeredSlides: true,
    grabCursor: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      dynamicBullets: true,
    },
    breakpoints: {
      0: { slidesPerView: 1 },
      520: { slidesPerView: 2 },
      950: { slidesPerView: 3 }
    }
  });
}



// function loadShayaris() {
//   database.ref('shayaris').once('value', (snapshot) => {
//     allShayaris = snapshot.val() || {};
//     renderShayaris(allShayaris);
//   });
// }

function download(text) {
  localStorage.setItem("s001", text);
  window.open("/Download", "_self");
}

function edit(key) {
  localStorage.setItem("e01", key);
  window.open("/admin", "_self");
}

window.onload = loadShayaris;


const searchBtn = document.querySelector('.search-toggle');
const searchBar = document.getElementById('searchBar');

searchBtn.addEventListener('click', () => {
  searchBtn.classList.add('pop-out');
  setTimeout(() => {
    searchBtn.style.display = 'none';
    searchBar.classList.add('visible');
    searchBar.focus();
  }, 300); // wait for animation to finish
});

searchBar.addEventListener('blur', () => {
  searchBar.classList.remove('visible');
  setTimeout(() => {
    searchBtn.style.display = 'inline';
    searchBtn.classList.remove('pop-out');
  }, 200);
});

    
document.getElementById('searchBar').addEventListener('input', function (e) {
  const query = e.target.value.toLowerCase();
  const filtered = {};

  for (let key in allShayaris) {
    if (allShayaris[key].text.toLowerCase().includes(query)) {
      filtered[key] = allShayaris[key];
    }
  }

  renderShayaris(filtered);
});

 const toggle = document.getElementById("darkModeToggle");
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    }

const devOverlay = document.getElementById('devModalOverlay');
  const devCard = devOverlay.querySelector('.dev-modal-card');

  function showDevModal() {
    devOverlay.style.display = 'flex';
    devCard.style.animation = 'scaleUp 0.4s ease forwards';
  }

  devOverlay.addEventListener('click', () => {
    devCard.style.animation = 'scaleDown 0.3s ease forwards';
    setTimeout(() => {
      devOverlay.style.display = 'none';
    }, 300);
  });

  function loadShayaris() {
  const loader = document.getElementById('pageLoader');

  database.ref('shayaris').once('value', (snapshot) => {
    allShayaris = snapshot.val() || {};
    renderShayaris(allShayaris);

    // Hide loader after rendering is done
    setTimeout(() => {
      loader.classList.add('hidden');
    }, 500); // slight delay for fade-out effect
  });
}

// if (Object.keys(allShayaris).length > 0) {
//   loader.classList.add('hidden');
// }
