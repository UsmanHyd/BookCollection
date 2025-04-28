import React from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 

function ViewBook() {
  const { id } = useParams();
  const navigate = useNavigate();

  
  const books = [
    { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", description: "A novel about the American dream...", published: "1925" },
    { id: 2, title: "1984", author: "George Orwell", description: "A dystopian novel...", published: "1949" },
    { id: 3, title: "To Kill a Mockingbird", author: "Harper Lee", description: "A story of racial injustice...", published: "1960" },
  ];

  const book = books.find((book) => book.id === parseInt(id));

  if (!book) {
    return <p>⚠️ Book not found.</p>;
  }

  return (
    <div className="view-book-panel">
      <h2>{book.title}</h2>
      <div className="book-details">
        <p><strong>Author:</strong> {book.author}</p>
        <p><strong>Published:</strong> {book.published}</p>
        <p><strong>Description:</strong> {book.description}</p>
      </div>
      <button className="fav-btn" onClick={() => navigate('/')}>Back to Books</button>
    </div>
  );
}

export default ViewBook;
