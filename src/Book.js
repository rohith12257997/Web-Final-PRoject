import React from 'react'
import PropTypes from 'prop-types'

const Book = props => {
    const {book} = props;

    const handleOnUpdateShelf = event => {
        props.onUpdateShelf(book, event.target.value);
    };

    // Handle the search to work correctly when a book does not have a thumbnail
    const getThumbnail = (book) => {
        try {
            // Try to send the thumbnail URL
            return book.imageLinks.thumbnail;
        }
        catch(err) {
            // If try failes end empty string
            return '';
        }
    };

    // If the shelf is undefined return none else return the shelf
    const getDefaultShelfValue = (book) => {
        if (book.shelf === undefined) {
            return 'none';
        }

        return book.shelf;
    };

    return (
        <div className="book">
            <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${getThumbnail(book)})` }}></div>
                <div className="book-shelf-changer">
                    <select onChange={handleOnUpdateShelf} defaultValue={getDefaultShelfValue(book)}>
                        <option value="move" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                    </select>
                </div>
            </div>
            <div className="book-title">{book.title}</div>
            <div className="book-authors">{book.authors}</div>
        </div>
    );
};

Book.propTypes = {
    book: PropTypes.object.isRequired,
    onUpdateShelf: PropTypes.func.isRequired,
};

export default Book;