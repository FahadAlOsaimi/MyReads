import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import * as booksAPI from "../BooksAPI";
import SearchBook from './SearchBook'

export default function SearchPage(props) {

    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [showErrorMsg, setShowErrorMsg] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            if (searchTerm !== "") {
                const data = await booksAPI.search(searchTerm, 20);
                if (!data.error) {
                    const newData = data.map(async (book) => {
                        const updateShelf = await booksAPI.get(book.id);
                        if (updateShelf.authors === undefined) {
                            return { ...book, shelf: updateShelf.shelf, authors: ["No authors found."] }
                        }
                        return { ...book, shelf: updateShelf.shelf }
                    });
                    const finalResult = await Promise.all(newData);
                    setSearchResults(finalResult);
                    setShowErrorMsg(false);
                } else {
                    setSearchResults([]);
                    setShowErrorMsg(true);
                }
            } else {
                setSearchResults([]);
            }
        }
        fetchData();
    }, [searchTerm, props.shelfValues]);

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
                        searchResults &&
                            searchResults.map((book, index) => {
                                return <li key={index}> <SearchBook book={book} /> </li>
                            })
                    }
                    {
                        showErrorMsg && <h2>Sorry, nothing is found.</h2>
                    }
                </ol>
            </div>
        </div>
    )
}
