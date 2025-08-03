// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCnNX1a6pw6gpW0X3EfVJy_AL70GuAd9yM",
  authDomain: "event-manager-a94d5.firebaseapp.com",
  projectId: "event-manager-a94d5",
  storageBucket: "event-manager-a94d5.firebasestorage.app",
  messagingSenderId: "545322916918",
  appId: "1:545322916918:web:8e2d92d9aeea98e0b94c97",
  measurementId: "G-5BEVS5ZP0D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth =getAuth(app)
export const db =getFirestore(app)
