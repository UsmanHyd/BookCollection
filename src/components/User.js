import React, { useState, useEffect } from "react"; 
import "./User.css"; 

function User() {
  const [books, setBooks] = useState([]); 
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const bookData = [
    { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", favorite: false },
    { id: 2, title: "1984", author: "George Orwell", favorite: false },
    { id: 3, title: "To Kill a Mockingbird", author: "Harper Lee", favorite: false },
  ];

  useEffect(() => {
    setBooks(bookData);
  }, []);

  const toggleFavorite = (id, isFavorite) => {
    setBooks(books.map(book =>
      book.id === id ? { ...book, favorite: !isFavorite } : book
    ));
  };

  const filteredBooks = books.filter((book) => {
    if (activeTab === "favorites") {
      return book.favorite && 
        (book.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        book.author.toLowerCase().includes(searchTerm.toLowerCase()));
    } else {
      return book.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        book.author.toLowerCase().includes(searchTerm.toLowerCase());
    }
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
