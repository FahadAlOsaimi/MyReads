import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SearchPage from "./Components/SearchPage";
import BooksPage from "./Components/BooksPage";
import { useEffect, useState } from "react";
import * as booksAPI from "./BooksAPI";

function App() {

  const [shelfValues, setShelfValues] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await booksAPI.getAll()
      setShelfValues(data);
    }
    fetchData();
  }, [])

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<BooksPage />} />
          <Route path="/search" element={<SearchPage shelfValues = {shelfValues}/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
