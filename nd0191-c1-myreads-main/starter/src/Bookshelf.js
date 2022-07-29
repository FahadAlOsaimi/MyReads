import React from 'react'
import Book from './Book'

export default function Bookshelf(props) {
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{props.shelfName}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {
                        props.books.map((book, index) => {
                            return <li key={ index }> <Book book={ book } /> </li>
                        })
                    }
                </ol>
            </div>
        </div>
    )
}