import { initializeApp, getApps, getApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCAizQLE1kNZsvUKxow8lWD6tGyAQKFAlo",  // Use the API key from the Firebase project
  authDomain: "wastenot-e3d84.firebaseapp.com",     // Firebase auth domain
  databaseURL: "https://wastenot-e3d84-default-rtdb.firebaseio.com",  // Firebase Realtime Database URL
  projectId: "wastenot-e3d84",                      // Firebase project ID
  storageBucket: "wastenot-e3d84.appspot.com",      // Firebase Storage Bucket
  messagingSenderId: "458342163285",                // Messaging Sender ID
  appId: "1:458342163285:android:a22ddffa0e5f0087ac45dc",  // Firebase App ID
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export default app;
