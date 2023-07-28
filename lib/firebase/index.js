// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBV0LA6XN-Fmwh1gUa1X_QS4-P5JgvPVRM",
  authDomain: "coin-sense-2477c.firebaseapp.com",
  projectId: "coin-sense-2477c",
  storageBucket: "coin-sense-2477c.appspot.com",
  messagingSenderId: "742906742064",
  appId: "1:742906742064:web:6850c063ca9d2c7237f4f5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export {app,db, auth}