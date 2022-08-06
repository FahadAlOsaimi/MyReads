import React from 'react'
import * as booksAPI from "../BooksAPI";

export default function Book(props) {

    const selectHandler = (e) => {
        booksAPI.update(props.book, e.target.value);
        const newBooks = props.books.map(book => {
            if (props.book.id === book.id){
                return {...book, shelf: e.target.value}
            }
            return book;
        });
        props.updateState(newBooks);
    }
    
    return (
        <div className="book">
            <div className="book-top">
                <div
                    className="book-cover"
                    style={{
                        width: 128,
                        height: 193,
                        backgroundImage: props.book.imageLinks? `url(${props.book.imageLinks.thumbnail})`: null
                    }}
                ></div>
                <div className="book-shelf-changer">
                    <select defaultValue={props.book.shelf} onChange={selectHandler}>
                        <option value="none" disabled>
                            Move to...
                        </option>
                        <option value="currentlyReading">
                            Currently Reading
                        </option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                    </select>
                </div>
            </div>
            <div className="book-title">{props.book.title}</div>
            <div className="book-authors">{props.book.authors.join(', ')}</div>
        </div>
    )
}
