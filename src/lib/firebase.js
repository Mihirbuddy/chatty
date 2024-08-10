

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {getStorage} from "firebase/storage";


const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "chatty-d6d5b.firebaseapp.com",
  projectId: "chatty-d6d5b",
  storageBucket: "chatty-d6d5b.appspot.com",
  messagingSenderId: "1011230852958",
  appId: "1:1011230852958:web:55778b2d769c74ca7b31cf",
  measurementId: "G-73DN6SGR5N"
};

const app = initializeApp(firebaseConfig);



export const auth=getAuth()
export const db=getFirestore()
export const storage=getStorage()


