// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth" 
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBV9K6zInZzD2g_ncAv851GrZsdqO8rnKo",
  authDomain: "stanza-79877.firebaseapp.com",
  projectId: "stanza-79877",
  storageBucket: "stanza-79877.appspot.com",
  messagingSenderId: "934069582216",
  appId: "1:934069582216:web:7c6fa352294736bbf4a23d",
  measurementId: "G-8RV8XVW90Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
export const db = getFirestore(app)
export const storage = getStorage(app)
