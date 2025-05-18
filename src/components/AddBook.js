import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase'; // adjust the path based on your folder structure
import { collection, addDoc } from 'firebase/firestore';

function AddBook() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const navigate = useNavigate();

  const handleAddBook = async (e) => {
    e.preventDefault();
    if (!title || !author) {
      alert("Both title and author are required.");
      return;
    }

    try {
      await addDoc(collection(db, "books"), {
        title,
        author,
        favorite: false
      });
      alert("Book added successfully!");
      navigate('/');
    } catch (error) {
      console.error("Error adding book:", error);
      alert("Failed to add book.");
    }
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
