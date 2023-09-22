// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const apiKey = import.meta.env.VITE_API_KEY;

// Your web app's Firebase configuration
const firebaseConfig = {
  // eslint-disable-next-line no-undef
  apiKey: apiKey,
  authDomain: "longtatest.firebaseapp.com",
  projectId: "longtatest",
  storageBucket: "longtatest.appspot.com",
  messagingSenderId: "524911211523",
  appId: "1:524911211523:web:3e665aa85c024521588a36",
};

console.log(apiKey);

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
