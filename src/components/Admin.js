import React, { useEffect, useState } from "react";
import "./Admin.css";
import { 
  collection, 
  getDocs, 
  addDoc, 
  deleteDoc, 
  doc, 
  updateDoc, 
  query, 
  where 
} from "firebase/firestore";
import { firestore, auth } from "../firebase.js";
import { signOut } from "firebase/auth";

function Admin() {
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [editBookId, setEditBookId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editAuthor, setEditAuthor] = useState("");

  const booksCollection = collection(firestore, "books");
  const usersCollection = collection(firestore, "users");

  // 🚀 Fetch Books and Users from Firestore
  useEffect(() => {
    fetchBooks();
    fetchUsers();
  }, []);

  // Fetch Books
  const fetchBooks = async () => {
    try {
      const snapshot = await getDocs(booksCollection);
      const booksList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBooks(booksList);
    } catch (error) {
      console.error("⚠️ Error fetching books:", error);
    }
  };

  // Fetch Only Users (Exclude Admins)
  const fetchUsers = async () => {
    try {
      const q = query(usersCollection, where("role", "==", "user"));
      const snapshot = await getDocs(q);
      const usersList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(usersList);
    } catch (error) {
      console.error("⚠️ Error fetching users:", error);
    }
  };

  // ➕ Add New Book
  const addBook = async () => {
    if (newTitle.trim() === "" || newAuthor.trim() === "") {
      alert("⚠️ Please fill in both title and author.");
      return;
    }
    try {
      await addDoc(booksCollection, {
        title: newTitle,
        author: newAuthor,
        favorite: false,
      });
      setNewTitle("");
      setNewAuthor("");
      fetchBooks();
    } catch (error) {
      console.error("⚠️ Error adding book:", error);
    }
  };

  // ✏️ Enable Edit Mode
  const enableEditMode = (book) => {
    setEditBookId(book.id);
    setEditTitle(book.title);
    setEditAuthor(book.author);
  };

  // 💾 Update Book
  const updateBook = async () => {
    if (editTitle.trim() === "" || editAuthor.trim() === "") {
      alert("⚠️ Please fill in both title and author.");
      return;
    }
    try {
      const bookDoc = doc(firestore, "books", editBookId);
      await updateDoc(bookDoc, {
        title: editTitle,
        author: editAuthor,
      });
      setEditBookId(null);
      setEditTitle("");
      setEditAuthor("");
      fetchBooks();
    } catch (error) {
      console.error("⚠️ Error updating book:", error);
    }
  };

  // ❌ Delete Book
  const deleteBook = async (id) => {
    try {
      await deleteDoc(doc(firestore, "books", id));
      fetchBooks();
    } catch (error) {
      console.error("⚠️ Error deleting book:", error);
    }
  };

  // 🚪 Logout Functionality
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        alert("👋 Logged out successfully!");
        window.location.href = "/";
      })
      .catch((error) => console.error("⚠️ Logout Error:", error));
  };

  return (
    <div className="admin-panel">
      <h2>🔑 Admin Panel</h2>
      <button className="logout-btn" onClick={handleLogout}>
        🚪 Logout
      </button>

      <div className="admin-sections">
        {/* 📥 Add Data Section */}
        <div className="section">
          <h3>📚 Add/View/Manage Books</h3>
          <div className="add-book-form">
            <input
              type="text"
              placeholder="📖 Title"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
            <input
              type="text"
              placeholder="✍️ Author"
              value={newAuthor}
              onChange={(e) => setNewAuthor(e.target.value)}
            />
            <button onClick={addBook}>➕ Add Book</button>
          </div>

          <h4>📖 Book List</h4>
          {books.length === 0 ? (
            <p>⚠️ No books found.</p>
          ) : (
            <ul className="book-list">
              {books.map((book) => (
                <li key={book.id}>
                  {editBookId === book.id ? (
                    <div>
                      <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                      />
                      <input
                        type="text"
                        value={editAuthor}
                        onChange={(e) => setEditAuthor(e.target.value)}
                      />
                      <button onClick={updateBook}>💾 Save</button>
                      <button onClick={() => setEditBookId(null)}>✖️ Cancel</button>
                    </div>
                  ) : (
                    <div>
                      <h4>{book.title}</h4>
                      <p>{book.author}</p>
                      <button onClick={() => enableEditMode(book)}>✏️ Edit</button>
                      <button className="delete-btn" onClick={() => deleteBook(book.id)}>
                        ❌ Delete
                      </button>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* 👥 View Users Section */}
        <div className="section">
          <h3>👥 View Users</h3>
          {users.length === 0 ? (
            <p>⚠️ No users found.</p>
          ) : (
            <ul className="user-list">
              {users.map((user) => (
                <li key={user.id}>
                  <p>👤 <strong>{user.name}</strong> — {user.email}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default Admin;