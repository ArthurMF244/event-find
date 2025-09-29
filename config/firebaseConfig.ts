import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDta13kr1jg6fhuBgEQ35C84HhsA_seMF4",
  authDomain: "event-find.firebaseapp.com",
  projectId: "event-find",
  storageBucket: "event-find.appspot.com",
  messagingSenderId: "544862979811",
  appId: "1:544862979811:web:2a6eee8873501cf14be7d6",
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Exporta serviços
export const auth = getAuth(app);
export const db = getFirestore(app);