import React from 'react';
import { Link } from "react-router-dom";
import Bookshelf from './Bookshelf';

export default function BooksPage(props) {
  
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          <Bookshelf shelfName="Currently Reading" books={props.books.filter(book => book.shelf === 'currentlyReading')} />
          <Bookshelf shelfName="Want to Read" books={props.books.filter(book => book.shelf === 'wantToRead')} />
          <Bookshelf shelfName="Read" books={props.books.filter(book => book.shelf === 'read')} />
        </div>
      </div>
      <div className="open-search">
        <Link to='/search'>Add a book</Link>
      </div>
    </div>
  )
}
