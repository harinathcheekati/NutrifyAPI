// lib/firebase.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDwVVHlJdGElJ4i5QUytYLiKAsWAjYwxU0",
  authDomain: "studio-8456827210-c1c4f.firebaseapp.com",
  projectId: "studio-8456827210-c1c4f",
  storageBucket: "studio-8456827210-c1c4f.firebasestorage.app",
  messagingSenderId: "274766777922",
  appId: "1:274766777922:web:1d582eb7ae673eca90a7db",
  databaseURL: "https://studio-8456827210-c1c4f.firebaseio.com", // ✅ important
};

// Initialize Firebase safely
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// Export services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
