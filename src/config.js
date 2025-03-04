// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBPvJqj0fRKk91a1hyKBgbDL3OBwZQnynk",
  authDomain: "felix-sandboxlive.firebaseapp.com",
  projectId: "felix-sandboxlive",
  storageBucket: "felix-sandboxlive.firebasestorage.app",
  messagingSenderId: "370144251072",
  appId: "1:370144251072:web:5b54238fafba249b80f125",
  measurementId: "G-40D5LMYMZG"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
export default app