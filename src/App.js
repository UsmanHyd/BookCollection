import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import User from "./components/User";
import AddBook from "./components/AddBook";
import ViewBook from "./components/ViewBook";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<User />} />
        <Route path="/add" element={<AddBook />} /> 
        <Route path="/view/:id" element={<ViewBook />} /> 
      </Routes>
    </Router>
  );
}

export default App;
