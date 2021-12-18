import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Books from './Books'

class ListBooks extends Component {
    static propTypes = {
        books: PropTypes.array.isRequired,
        onUpdateShelf: PropTypes.func.isRequired,
    };

    render() {
        const { books } = this.props;

        const filterBooksByShelf = (shelf) => books.filter (book => book.shelf === shelf);

        const shelves = [
            ['Currently Reading', 'currentlyReading'],
            ['Want to Read', 'wantToRead'],
            ['Read', 'read']
        ]

        return (
            <div className="list-books">
                <div className="list-books-title">
                <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                <div>
                    {shelves.map((shelf) => (
                        <Books
                            bookshelfTitle={shelf[0]}
                            books={filterBooksByShelf(shelf[1])}
                            key={shelf[1]}
                            onUpdateShelf={this.props.onUpdateShelf}
                        />
                    ))}
                </div>
                </div>
                <Link to='/search' className="open-search">
                    Search books
                </Link>
          </div>
        );
    }
}

export default ListBooks;