import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage'; 
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyC61HmwS4hR_M3gjTrdeIds6WlulPTHmas",
  authDomain: "entikayshop.firebaseapp.com",
  projectId: "entikayshop",
  storageBucket: "entikayshop.appspot.com",
  messagingSenderId: "396753626537",
  appId: "1:396753626537:web:7fbb57b6d45700aae1d0b8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;