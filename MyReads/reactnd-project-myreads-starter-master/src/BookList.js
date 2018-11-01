import React, { Component } from 'react'
import BookShelf from './BookShelf'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

class BookList extends Component {

    static propTypes = {
        updateShelf: PropTypes.func.isRequired
    }
    
    render() {

        return(
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                <BookShelf
                    key="currently"
                    books={this.props.books.filter(book => book.shelf === "currentlyReading")}
                    newShelf={this.props.updateShelf}
                    shelfTitle="Currently Reading"
                />
                <BookShelf
                    key="wantToRead"
                    books={this.props.books.filter(book => book.shelf === "wantToRead")}
                    newShelf={this.props.updateShelf}
                    shelfTitle="Want to Read"
                />
                <BookShelf
                    key="read"
                    books={this.props.books.filter(book => book.shelf === "read")}
                    newShelf={this.props.updateShelf}
                    shelfTitle="Read"
                />
                </div>
                <div className="open-search">
                    <Link to="/search">Add a book</Link>
                </div>
            </div>
        )
    }

}

export default BookList