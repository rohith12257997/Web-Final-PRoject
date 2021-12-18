import React from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

const Books = props => {

    const {books, bookshelfTitle} = props;
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{bookshelfTitle}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {books.map((book) => (
                        <li key={book.id}>
                            <Book book={book} onUpdateShelf={props.onUpdateShelf} />
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    );
};

Books.propTypes = {
    books: PropTypes.array.isRequired,
    onUpdateShelf: PropTypes.func.isRequired,
};

export default Books;