const firebaseConfig = {
  apiKey: "AIzaSyAnk8ApGJZd85R8eT2ryg72jUd90VEyuAQ",
  authDomain: "test-pro-e6152.firebaseapp.com",
  projectId: "test-pro-e6152"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// window.onload = () => {
//   const userName = document.getElementById("userName");
//   const userEmail = document.getElementById("userEmail");
//   const loginBtn = document.getElementById("loginBtn");
//   const logoutBtn = document.getElementById("logoutBtn");

//   auth.onAuthStateChanged(user => {
//     if (user) {
//       // userName.textContent = user.displayName || "User";
//       userName.textContent = "Raj Vardhan Singh";
//       userEmail.textContent = user.email;
//       loginBtn.style.display = "none";
//       logoutBtn.style.display = "inline-block";
//     } else {
//       userName.textContent = "Guest";
//       userEmail.textContent = "You are not logged in.";
//       loginBtn.style.display = "inline-block";
//       logoutBtn.style.display = "none";
//     }
//   });

//   loginBtn.onclick = () => {
//     location.href='/Auth/';
//   };

//   logoutBtn.onclick = () => {
//     auth.signOut().then(() => location.reload());
//   };

//   // Dark mode toggle logic
//   const toggle = document.getElementById("darkModeToggle");
//   if (localStorage.getItem("theme") === "dark") {
//     document.body.classList.add("dark");
//     toggle.checked = true;
//   }

//   toggle.addEventListener("change", () => {
//     if (toggle.checked) {
//       document.body.classList.add("dark");
//       localStorage.setItem("theme", "dark");
//     } else {
//       document.body.classList.remove("dark");
//       localStorage.setItem("theme", "light");
//     }
//   });
// };

window.onload = () => {
  const loader = document.getElementById('pageLoader');
  const userName = document.getElementById("userName");
  const userEmail = document.getElementById("userEmail");
  const loginBtn = document.getElementById("loginBtn");
  const logoutBtn = document.getElementById("logoutBtn");
  const toggle = document.getElementById("darkModeToggle");

  // Apply theme BEFORE showing UI
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    toggle.checked = true;
  }

  // Theme toggle listener
  toggle.addEventListener("change", () => {
    if (toggle.checked) {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  });

  // Wait for Firebase auth status
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      userName.textContent = "Raj Vardhan Singh"; // or user.displayName
      userEmail.textContent = user.email;
      loginBtn.style.display = "none";
      logoutBtn.style.display = "inline-block";
    } else {
      userName.textContent = "Guest";
      userEmail.textContent = "You are not logged in.";
      loginBtn.style.display = "inline-block";
      logoutBtn.style.display = "none";
    }
loginBtn.onclick = () => {
    location.href='/Auth/';
  };

  logoutBtn.onclick = () => {
    auth.signOut().then(() => location.reload());
  };
    // All UI is set, hide loader
    setTimeout(() => {
      loader.classList.add("hidden");
    }, 500); // fade-out delay
  });
};



document.body.classList.add("theme-transition");
setTimeout(() => document.body.classList.remove("theme-transition"), 400);


