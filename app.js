// Import Firebase Modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getDatabase, ref, push, onChildAdded } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-database.js";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyCRLklls1SDp1rD6_3u8HWFH_cJtR1s1Sc",
  authDomain: "database-95dee.firebaseapp.com",
  databaseURL: "https://database-95dee-default-rtdb.firebaseio.com",
  projectId: "database-95dee",
  storageBucket: "database-95dee.firebasestorage.app",
  messagingSenderId: "185092331154",
  appId: "1:185092331154:web:419e69e9983b8015df384b",
  measurementId: "G-JZDHM6G5MQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Make sendMessage globally accessible
window.sendMessage = function () {
    let username = document.getElementById("username").value;
    let message = document.getElementById("message").value;

    if (username === "" || message === "") return;

    // Push message to Firebase
    push(ref(db, "messages"), {
        name: username,
        text: message
    });

    document.getElementById("message").value = ""; // Clear input
};

// Function to listen for new messages
onChildAdded(ref(db, "messages"), function(snapshot) {
    let data = snapshot.val();
    let messageBox = document.getElementById("messages");
    let msgElement = document.createElement("p");
    msgElement.textContent = data.name + ": " + data.text;

    messageBox.appendChild(msgElement);
    messageBox.scrollTop = messageBox.scrollHeight;
});
