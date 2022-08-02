import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import * as booksAPI from "../BooksAPI";
import SearchBook from './SearchBook'

export default function SearchPage() {

    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            if (searchTerm !== "") {
                const data = await booksAPI.search(searchTerm, 20);

                const newData = data.map(async (book) => {
                    const updateShelf = await booksAPI.get(book.id);
                    return {...book, shelf: updateShelf.shelf}
                });
                const finalResult = await Promise.all(newData);
                setSearchResults(finalResult);
            } else {
                setSearchResults([]);
            }
        }
        fetchData();
    }, [searchTerm]);

    return (
        <div className="search-books">
            <div className="search-books-bar">
                <Link to='/' className='close-search'>Close</Link>
                <div className="search-books-input-wrapper">
                    <input
                        type="text"
                        placeholder="Search by title, author, or ISBN"
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>
            <div className="search-books-results">
                <ol className="books-grid">
                    {
                        searchResults ?
                            searchResults.map((book, index) => {
                                return <li key={index}> <SearchBook book={book} /> </li>
                            }) : null
                    }
                </ol>
            </div>
        </div>
    )
}
