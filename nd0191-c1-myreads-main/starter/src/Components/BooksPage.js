import React from 'react';
import { Link } from "react-router-dom";
import Bookshelf from './Bookshelf';
import { useEffect, useState } from "react";
import * as booksAPI from "../BooksAPI";

export default function BooksPage() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await booksAPI.getAll();
      setBooks(data);
    }
    fetchData();
  }, []); // [] now useEffect will only be run when a component mounts, but not when it get updated (avoid loop)

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          <Bookshelf shelfName="Currently Reading" shelfValue="currentlyReading" books={ books } updateState={setBooks} />
          <Bookshelf shelfName="Want to Read" shelfValue="wantToRead" books={ books } updateState={setBooks}/>
          <Bookshelf shelfName="Read" shelfValue="read" books={ books } updateState={setBooks}/>
        </div>
      </div>
      <div className="open-search">
        <Link to='/search'>Add a book</Link>
      </div>
    </div>
  )
}
