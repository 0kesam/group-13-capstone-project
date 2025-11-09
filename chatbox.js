// chat.js

// Import what we need from Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-database.js";

// Your Firebase project info
const firebaseConfig = {
  apiKey: "AIzaSyCAlcdREpfIXwY5M5goSTMmF2Mt1FncpdQ",
  authDomain: "farmhubchat.firebaseapp.com",
  projectId: "farmhubchat",
  storageBucket: "farmhubchat.firebasestorage.app",
  messagingSenderId: "759397527726",
  appId: "1:759397527726:web:146122d6cfcdf667a97d3f",
  measurementId: "G-39D9PWDSVC",
  databaseURL: "https://farmhubchat-default-rtdb.europe-west1.firebasedatabase.app"
 
};

// Start Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const chatRef = ref(db, "messages");

// This function sends messages
function sendMessage() {
  let input = document.getElementById("messageInput");
  let message = input.value.trim();
  let sender = document.getElementById("sender").value;

  if (message === "") {
    alert("Please type a message");
    return;
  }

  // Save to Firebase
  push(chatRef, {
    text: message,
    side: sender
  });

  input.value = "";
}

// Show messages when database changes
onValue(chatRef, (snapshot) => {
  let messagesDiv = document.getElementById("messages");
  messagesDiv.innerHTML = "";

  let data = snapshot.val();

  if (data) {
    Object.values(data).forEach(msg => {
      let div = document.createElement("div");
      div.classList.add("message", msg.side);
      div.textContent = msg.text;
      messagesDiv.appendChild(div);
    });
  }
});

// 🔴 Make sure the HTML "onclick" can find this function
window.sendMessage = sendMessage;
