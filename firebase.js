// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// auth import -> step 1
import {getAuth} from "firebase/auth";
// firestore step-1
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBzjAxE5_yl7tt6t4HRBZWMt10esbTj4WQ",
  authDomain: "wa-clone-515a2.firebaseapp.com",
  projectId: "wa-clone-515a2",
  storageBucket: "wa-clone-515a2.appspot.com",
  messagingSenderId: "91878528956",
  appId: "1:91878528956:web:8c3414ae0cb678f8227db9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// auth - step 2
const auth = getAuth(app);
// firestore step-2
const db = getFirestore();

const storage = getStorage();

export {auth, db, storage};