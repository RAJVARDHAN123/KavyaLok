import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";

// 🔐 Replace these with your actual Firebase project config
const firebaseConfig = {
  apiKey: "AIzaSyAnk8ApGJZd85R8eT2ryg72jUd90VEyuAQ",
  authDomain: "test-pro-e6152.firebaseapp.com",
  projectId: "test-pro-e6152",
  appId: "1:766763484355:web:db970872019c63a507ce76"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const status = document.getElementById("status");
const loginBtn = document.getElementById("google-login");
const logoutBtn = document.getElementById("logout-btn");

// List of allowed email addresses
const allowedEmails = ["exameject@gmail.com", "developerrajvsr@gmail.com"];

loginBtn.addEventListener("click", async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    
    // Check if the logged-in user's email is in the allowed emails list
    if (allowedEmails.includes(user.email)) {
      status.textContent = `Welcome, ${user.displayName}`;
      window.localStorage.setItem("e01", 'null');
      setTimeout(() => {
        window.location.href = "/admin.html"; // Redirect to admin page
      }, 1000);
    } else {
      // If email is not allowed, sign out the user
      await signOut(auth);
      status.textContent = `Access denied. This email is not authorized.`;
    }
  } catch (error) {
    status.textContent = `Login failed: ${error.message}`;
  }
});

// 🔁 Redirect if already signed in
onAuthStateChanged(auth, user => {
  if (user) {
    if (allowedEmails.includes(user.email)) {
      window.location.href = "/admin"; // User is allowed, redirect to admin
    } else {
      signOut(auth); // If user email is not allowed, sign out and show message
      status.textContent = `Access denied. This email is not authorized.`;
    }
  }
});

  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
  }
