// firebase.js
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// ✅ Firebase Configuration (Keep this same as in App.tsx)
const firebaseConfig = {
  apiKey: "AIzaSyCAizQLE1kNZsvUKxow8lWD6tGyAQKFAlo",
  authDomain: "wastenot-e3d84.firebaseapp.com",
  databaseURL: "https://wastenot-e3d84-default-rtdb.firebaseio.com",
  projectId: "wastenot-e3d84",
  storageBucket: "wastenot-e3d84.firebasestorage.app",
  messagingSenderId: "458342163285",
  appId: "1:458342163285:android:a22ddffa0e5f0087ac45dc",
};

// ✅ Fix for Firebase Initialization Issue
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { auth };
