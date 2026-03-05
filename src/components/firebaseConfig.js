import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyANMLbugL_S7oMpT-JkaDqSbcQIhNtG2Js",
  authDomain: "ponglertv2.firebaseapp.com",
  projectId: "ponglertv2",
  storageBucket: "ponglertv2.firebasestorage.app",
  messagingSenderId: "907491673441",
  appId: "1:907491673441:web:7ae0ee7fb3f94025ea3120"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, getDocs, addDoc, updateDoc, deleteDoc, doc };

