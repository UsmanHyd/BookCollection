// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
export default app; 