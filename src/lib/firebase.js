

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {getStorage} from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyAauIW-zITfQAEKazArBEPUQ45YCKvBBig",
  authDomain: "chatt-61d6c.firebaseapp.com",
  projectId: "chatt-61d6c",
  storageBucket: "chatt-61d6c.firebasestorage.app",
  messagingSenderId: "138867179839",
  appId: "1:138867179839:web:492c06f3b4ba425992938a",
  measurementId: "G-Y3LC5KRZ2T"
};

const app = initializeApp(firebaseConfig);



export const auth=getAuth()
export const db=getFirestore()
export const storage=getStorage()


