import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Books from './Books'

class SearchBooks extends Component {
    static propTypes = {
        books: PropTypes.array.isRequired,
        onUpdateShelf: PropTypes.func.isRequired,
    };

    state = {
        query: '',
        showingBooks: []
    };

    setBooks = (books=[]) => {
        this.setState((currState) => ({
            ...currState,
            showingBooks: books
        }))
        // console.log('books', books)
    }

    setQuery = (query='') => {
        this.setState((currState) => ({
            ...currState,
            query
        }));
        // console.log('query', query)
    }

    updateQuery = (query) => {
        const booksInCollection = this.props.books;

        this.setQuery(query)

        if (query === '') {
            // If query is cleared, set searched books array back to blank
            this.setBooks();
        } else {
            // When is not empty, fetch search result
            BooksAPI.search(query)
            .then((books) => {
                // If nothing is found the API will return an object with error property.
                // So, if books.error exists, return. The searched books array will remain as it is.
                if (books.error) {
                    // If nothing is found, set searched books array back to blank
                    this.setBooks();
                    return;
                }

                // For every book from search result, if it exists in the collection,
                // Replace it with the book from shelf to show the book.shelf
                for (var i=0; i<books.length; i++) {
                    for(var j=0; j<booksInCollection.length; j++) {
                        if (booksInCollection[j].id === books[i].id) {
                            books[i] = booksInCollection[j];
                        }
                    }
                }

                this.setBooks(books)
            })
        }
    };

    render() {
        const { query, showingBooks } = this.state;

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to='/' className="close-search">
                        Close
                    </Link>
                    <div className="search-books-input-wrapper">
                        {/*
                        

                        However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                        you don't find a specific author or title. Every search is limited by search terms.
                        */}
                        <input
                            className='search-contacts'
                            type='text'
                            placeholder='Search by title or author'
                            value={query}
                            onChange={(event) => this.updateQuery(event.target.value)}
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    {/* <ol className="books-grid"></ol> */}
                    {/* <ListBooks
                        books={showingBooks}
                        onUpdateShelf={this.props.onUpdateShelf}
                    /> */}
                    <Books books={showingBooks} bookshelfTitle="Search results" onUpdateShelf={this.props.onUpdateShelf} />
                </div>
            </div>
        );
    }
}

export default SearchBooks;