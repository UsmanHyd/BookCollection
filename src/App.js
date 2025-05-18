import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { auth } from "./firebase";
import User from "./components/User";
import AddBook from "./components/AddBook";
import Auth from "./components/Auth";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check authentication state
    const unsubscribe = auth.onAuthStateChanged((user) => {
      console.log("Auth state changed:", user);
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Function to check if user is admin
  const isAdmin = () => {
    return localStorage.getItem('userRole') === 'admin';
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        {/* Default route - always show Auth first */}
        <Route 
          path="/" 
          element={<Auth />} 
        />
        
        {/* Protected routes */}
        <Route 
          path="/user" 
          element={user ? <User /> : <Navigate to="/" />} 
        />
        <Route 
          path="/admin" 
          element={user && isAdmin() ? <AddBook /> : <Navigate to="/" />} 
        />
        <Route 
          path="/add" 
          element={user && isAdmin() ? <AddBook /> : <Navigate to="/" />} 
        />
      </Routes>
    </Router>
  );
}

export default App;
