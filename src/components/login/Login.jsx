import { useState } from "react";
import "./login.css";
import { toast } from "react-toastify";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../../lib/firebase"; // Ensure db and auth are initialized in firebase.js
import { doc, setDoc, collection, query, where, getDocs } from "firebase/firestore"; // Add getDocs import
import upload from "../../lib/upload";

const Login = () => {
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);

    const { username, email, password } = Object.fromEntries(formData);

    // VALIDATE INPUTS
    if (!username || !email || !password)
      return toast.warn("Please enter inputs!");
    // Removed avatar validation since it's no longer required

    // VALIDATE UNIQUE USERNAME
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("username", "==", username));
    try {
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        return toast.warn("Select another username");
      }

      // Create user in Firebase Auth
      const res = await createUserWithEmailAndPassword(auth, email, password);

      // Save user data in Firestore (No avatar handling)
      await setDoc(doc(db, "users", res.user.uid), {
        username,
        email,
        avatar: "https://www.example.com/dummy-avatar.jpg", // Dummy image link
        id: res.user.uid,
        blocked: [],
      });

      // Initialize user chats
      await setDoc(doc(db, "userchats", res.user.uid), {
        chats: [],
      });

      toast.success("Account created! You can login now!");
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const { email, password } = Object.fromEntries(formData);

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login">
      <div className="item">
        <h2>Welcome back,</h2>
        <form onSubmit={handleLogin}>
          <input type="text" placeholder="Email" name="email" />
          <input type="password" placeholder="Password" name="password" />
          <button disabled={loading}>{loading ? "Loading" : "Sign In"}</button>
        </form>
      </div>
      <div className="separator"></div>
      <div className="item">
        <h2>Create an Account</h2>
        <form onSubmit={handleRegister}>
          {/* Dummy avatar image is displayed */}
          <div className="avatar-placeholder">
            <img src="./emoji.png" alt="Dummy Avatar" />
          </div>
          <input type="text" placeholder="Username" name="username" />
          <input type="text" placeholder="Email" name="email" />
          <input type="password" placeholder="Password" name="password" />
          <button disabled={loading}>{loading ? "Loading" : "Sign Up"}</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
