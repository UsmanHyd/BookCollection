// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyARFMvQTpEoMGmaXZHBEETlEo0eozQnaws",
  authDomain: "bookcollection-3c223.firebaseapp.com",
  projectId: "bookcollection-3c223",
  storageBucket: "bookcollection-3c223.firebasestorage.app",
  messagingSenderId: "696631075960",
  appId: "1:696631075960:web:875573e6226a2e3824f98d",
  measurementId: "G-95R3QXZFTQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
