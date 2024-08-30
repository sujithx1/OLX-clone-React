
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyAAAS-YTg23Mfxh-D7-rimxc7mV_tvQrEU",
  authDomain: "olx-mini-9cc2d.firebaseapp.com",
  projectId: "olx-mini-9cc2d",
  storageBucket: "olx-mini-9cc2d.appspot.com",
  messagingSenderId: "1056084856477",
  appId: "1:1056084856477:web:ddf2ec60b9f83768494e74",
  measurementId: "G-6PGQ9Y3019"
};

const firebaseApp = initializeApp(firebaseConfig);

export const auth = getAuth(firebaseApp);
export const firestore = getFirestore(firebaseApp);
export const storage=getStorage(firebaseApp)
