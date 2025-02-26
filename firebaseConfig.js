import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";

// Your Firebase config (replace with your actual config)
const firebaseConfig = {
    apiKey: "AIzaSyAEp5Yfh3dpSqfo8Jjm3-qIYcMz2itiFjs",
    authDomain: "shaneque.firebaseapp.com",
    projectId: "shaneque",
    storageBucket: "shaneque.firebasestorage.app",
    messagingSenderId: "496529520284",
    appId: "1:496529520284:web:32a6e4b338a411b6e5df59"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, addDoc, getDocs };
