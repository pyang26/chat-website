// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD3ZwuW3wbIjYy24QbCJXvDsrNjT2xDIwg",
  authDomain: "chat-website-c7734.firebaseapp.com",
  projectId: "chat-website-c7734",
  storageBucket: "chat-website-c7734.appspot.com",
  messagingSenderId: "891465102238",
  appId: "1:891465102238:web:063ef2beb9c1ac8ec81c8f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);