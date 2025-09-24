import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
import { getFirestore, collection, addDoc, query, where, getDocs } 
  from "https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBdJZuEXbZEVnJHHb7LpWrGA2-vsMGzttk",
  authDomain: "manicure-964b2.firebaseapp.com",
  projectId: "manicure-964b2",
  storageBucket: "manicure-964b2.firebasestorage.app",
  messagingSenderId: "991438873800",
  appId: "1:991438873800:web:8355da8393e778b9c731fd",
  measurementId: "G-48N5Y94R4T"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);