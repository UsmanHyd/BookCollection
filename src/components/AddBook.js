import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddBook() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const navigate = useNavigate();

  const handleAddBook = (e) => {
    e.preventDefault();
    if (!title || !author) {
      alert("Both title and author are required.");
      return;
    }
    console.log("Book Added:", { title, author });
    alert("Book added successfully!");
    navigate('/');
  };
  

  return (
    <div className="add-book-panel">
      <h2>Add a New Book</h2>
      <form onSubmit={handleAddBook}>
        <input
          type="text"
          className="search-bar"
          placeholder="Book Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          className="search-bar"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <button type="submit" className="fav-btn">Add Book</button>
      </form>
    </div>
  );
}

export default AddBook;
