import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAdY-sSFnmCDPbDPYnJLtkiQL5Q8Dws9_o",
  authDomain: "furniture-website-fa93c.firebaseapp.com",
  projectId: "furniture-website-fa93c",
  storageBucket: "furniture-website-fa93c.appspot.com",
  messagingSenderId: "957560278276",
  appId: "1:957560278276:web:836bb5fd90302305671451",
  measurementId: "G-M5LWL4GCSY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app)
const db = getFirestore(app);
const storage = getStorage(app);


export {
    auth,
    db,
    storage 
}