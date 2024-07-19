import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {getStorage} from "firebase/storage";



const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "reactchatapp-6b5fc.firebaseapp.com",
  projectId: "reactchatapp-6b5fc",
  storageBucket: "reactchatapp-6b5fc.appspot.com",
  messagingSenderId: "1047763752992",
  appId: "1:1047763752992:web:359547d2da5467da34c445"
};

const app = initializeApp(firebaseConfig);

export const auth=getAuth()
export const db=getFirestore()
export const storage=getStorage()

