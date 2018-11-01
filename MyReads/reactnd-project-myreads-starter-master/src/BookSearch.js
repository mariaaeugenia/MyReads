import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

class BookSearch extends Component {

    static propTypes = {
        updateShelf: PropTypes.func.isRequired,
        myBooks: PropTypes.array.isRequired
    }
    
    state = {
        query: '',
        results: [],
        currentShelf: 'none'
    }

    searchBooks = () => {
        this.setState({ results: [] })
        if (this.search.value) {
            this.setState({
                query: this.search.value
            }, () => {
                BooksAPI.search(this.state.query, 20).then(
                    response => {
                        response.length > 0
                            ? this.setState({ results: response })
                            : this.setState({ results: [] })
                    }
                );
            })
        } else {
            this.setState({ results: [] })
        }
    }


    render() {

        return(
            <div className="search-books">
            <div className="search-books-bar">
              <Link to="/" className="close-search">Close</Link>
              <div className="search-books-input-wrapper">
                <input type="text" placeholder="Search by title or author"
                    ref={input => this.search = input}
                    onChange={this.searchBooks}
                />
              </div>
            </div>
            <div className="search-books-results">
            { this.state.results && (
                <ol className="books-grid">
                    {this.state.results.map((book) => 
                        <li key={book.id} className="book">
                            <div className="book-top">
                                { book.imageLinks && (
                                    <div className="book-cover" style={{ 
                                        width: 128, height: 193, 
                                        backgroundImage: "url(" +  book.imageLinks.thumbnail + ")" }}>
                                    </div>
                                )}
                                <div className="book-shelf-changer">
                                    <select value="none" onChange={s => this.props.updateShelf(book, s.target.value)}>
                                    <option value="move" disabled>Move to...</option>
                                    <option value="currentlyReading">Currently Reading</option>
                                    <option value="wantToRead">Want to Read</option>
                                    <option value="read">Read</option>
                                    <option value="none">None</option>
                                    </select>
                                </div>
                            </div>
                            <div className="book-title">{book.title}</div>
                            {book.authors && (
                            <div className="book-authors">{book.authors[0]}</div>
                            )}
                        </li>
                    )}
                </ol>
            )}
            </div>
          </div>

        )
    }

}

export default BookSearch




          