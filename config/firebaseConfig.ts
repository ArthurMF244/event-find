import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDtaI3kr1jg6fhuBqEQ35C84HhsA_seMF4",
  authDomain: "event-find.firebaseapp.com",
  projectId: "event-find",
  storageBucket: "event-find.appspot.com",
  messagingSenderId: "544862979811",
  appId: "1:544862979811:web:2a6aee8073501cf14be7d6"
};
 
// Inicializa Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Exporta serviços
export const auth = getAuth(app);
export const db = getFirestore(app);