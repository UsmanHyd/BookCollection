import React, { useEffect, useState } from "react";
import "./User.css"; 
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { firestore, auth } from "../firebase.js"; 
import { signOut } from "firebase/auth"; // Import signOut

function User() {
  const [books, setBooks] = useState([]); 
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all"); 

  const booksCollection = collection(firestore, "books"); 

  // 🚀 Fetch Books from Firestore
  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const snapshot = await getDocs(booksCollection);
      const booksList = snapshot.docs.map((doc) => ({
        id: doc.id,
        favorite: doc.data().favorite || false,
        ...doc.data(),
      }));
      setBooks(booksList);
    } catch (error) {
      console.error("⚠️ Error fetching books:", error);
    }
  };

  // ❤️ Mark or Unmark as Favorite
  const toggleFavorite = async (id, isFavorite) => {
    try {
      const bookRef = doc(firestore, "books", id);
      await updateDoc(bookRef, { favorite: !isFavorite });
      fetchBooks(); // Refresh List
    } catch (error) {
      console.error("⚠️ Error updating favorite:", error);
    }
  };

  // 🚪 Logout Functionality
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        alert("👋 Logged out successfully!");
        window.location.href = "/"; // Redirect to login or home
      })
      .catch((error) => console.error("⚠️ Logout Error:", error));
  };

  // 🔍 Filter Books Based on Search or Tab
  const filteredBooks = books.filter((book) => {
    if (activeTab === "favorites") {
      return book.favorite && (book.title.toLowerCase().includes(searchTerm.toLowerCase()) || book.author.toLowerCase().includes(searchTerm.toLowerCase()));
    } else {
      return book.title.toLowerCase().includes(searchTerm.toLowerCase()) || book.author.toLowerCase().includes(searchTerm.toLowerCase());
    }
  });

  return (
    <div className="user-panel">
      <h2>📚 User Panel — Book Collection</h2>

      {/* Logout Button */}
      <button className="logout-btn" onClick={handleLogout}>
        🚪 Logout
      </button>

      {/* Search Box */}
      <input
        type="text"
        placeholder="🔍 Search by title or author"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Tab Buttons */}
      <div className="tab-buttons">
        <button 
          className={activeTab === "all" ? "active" : ""} 
          onClick={() => setActiveTab("all")}
        >
          📚 All Books
        </button>
        <button 
          className={activeTab === "favorites" ? "active" : ""} 
          onClick={() => setActiveTab("favorites")}
        >
          ❤️ Favorites
        </button>
      </div>

      {/* Books List */}
      <ul className="book-list">
        {filteredBooks.length === 0 ? (
          <p>⚠️ No books found.</p>
        ) : (
          filteredBooks.map((book) => (
            <li key={book.id}>
              <h4>{book.title}</h4>
              <p>{book.author}</p>
              <button
                className={book.favorite ? "fav-btn active" : "fav-btn"}
                onClick={() => toggleFavorite(book.id, book.favorite)}
              >
                {book.favorite ? "❤️ Unfavorite" : "🤍 Favorite"}
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default User;