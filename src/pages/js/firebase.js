// Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyCg_6v3S86spYafSnWgthr5uHRpXslzkNk",
    authDomain: "daily-macro.firebaseapp.com",
    projectId: "daily-macro",
    storageBucket: "daily-macro.firebasestorage.app",
    messagingSenderId: "751506256212",
    appId: "1:751506256212:web:d7f1f815352a8a58de18c1",
    measurementId: "G-F81VJZX25C"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);