import React, { useState } from "react";
import { auth, firestore } from "../firebase";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword 
} from "firebase/auth";
import { collection, addDoc, getDocs, where, query } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function Auth() {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle Authentication (Login or Signup)
  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignup) {
        // 🔑 Signup Logic
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Save Role in Firestore
        await addDoc(collection(firestore, "users"), {
          uid: user.uid,
          email,
          role,
        });
        alert("✅ Signup Successful! Please Login.");
        setIsSignup(false);
      } else {
        // 🔑 Login Logic
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Check Role from Firestore
        const q = query(collection(firestore, "users"), where("uid", "==", user.uid));
        const snapshot = await getDocs(q);

        if (snapshot.empty) {
          alert("⚠️ No user data found.");
          return;
        }

        const userData = snapshot.docs[0].data();
        if (userData.role === "admin") {
          navigate("/admin"); // Redirect to Admin Panel
        } else {
          navigate("/user"); // Redirect to User Panel
        }
      }
    } catch (error) {
      console.error("⚠️ Auth Error:", error.message);
      alert(error.message);
    }
    setLoading(false);
  };

  // Toggle between Login and Signup
  const toggleMode = () => {
    setIsSignup(!isSignup);
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>{isSignup ? "🔑 Signup" : "🔓 Login"}</h2>
      <form onSubmit={handleAuth} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {isSignup && (
          <select onChange={(e) => setRole(e.target.value)}>
            <option value="user">👤 User</option>
            <option value="admin">🛠️ Admin</option>
          </select>
        )}

        <button type="submit" disabled={loading}>
          {loading ? "Processing..." : isSignup ? "Signup" : "Login"}
        </button>
      </form>

      <p style={{ marginTop: "15px", cursor: "pointer", color: "blue" }} onClick={toggleMode}>
        {isSignup ? "Already have an account? Login" : "Don't have an account? Signup"}
      </p>
    </div>
  );
}

export default Auth;
