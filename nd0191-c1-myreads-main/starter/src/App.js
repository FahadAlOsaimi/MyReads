import "./App.css";
import * as booksAPI from "./BooksAPI";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import SearchPage from "./SearchPage";
import BooksPage from "./BooksPage";

function App() {

  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await booksAPI.getAll();
      setBooks(data);
      console.log(data);
    }
    fetchData();
  }, []); // [] now useEffect will only be run when a component mounts, but not when it get updated (avoid loop)

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<BooksPage books={books} />} />
          <Route path="/search" element={<SearchPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
