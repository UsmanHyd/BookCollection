import React, { useState, useEffect } from "react";
import { db } from "../firebase"; // adjust if needed
import {
  collection,
  getDocs,
  updateDoc,
  doc
} from "firebase/firestore";

import "./User.css";

function User() {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const fetchBooks = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "books"));
      const booksData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setBooks(booksData);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const toggleFavorite = async (id, isFavorite) => {
    try {
      const bookRef = doc(db, "books", id);
      await updateDoc(bookRef, {
        favorite: !isFavorite
      });
      // Update local state
      setBooks(prevBooks =>
        prevBooks.map(book =>
          book.id === id ? { ...book, favorite: !isFavorite } : book
        )
      );
    } catch (error) {
      console.error("Error updating favorite:", error);
    }
  };

  const filteredBooks = books.filter((book) => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase());
    return activeTab === "favorites" ? book.favorite && matchesSearch : matchesSearch;
  });

  return (
    <div className="user-panel">
      <h2>📚 User Panel — Book Collection</h2>

      <input
        type="text"
        className="search-bar"
        placeholder="🔍 Search by title or author"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="tab-menu">
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

      <div className="book-list">
        {filteredBooks.length === 0 ? (
          <div style={{ width: '100%' }}><p>⚠️ No books found.</p></div>
        ) : (
          filteredBooks.map((book) => (
            <div className="book-card" key={book.id}>
              <h3>{book.title}</h3>
              <p>{book.author}</p>
              <button
                className={book.favorite ? "fav-btn active" : "fav-btn"}
                onClick={() => toggleFavorite(book.id, book.favorite)}
              >
                {book.favorite ? "❤️ Unfavorite" : "🤍 Favorite"}
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default User;
