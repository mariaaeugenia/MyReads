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
        results: []
    }

    searchBooks = () => {
        if (!this.search.value || this.search.value==="") {
            this.setState({
                results: [],
                query: ''
            })
            return
        }
        
        this.setState({
            query: this.search.value
        }, () => {
            BooksAPI.search(this.state.query).then(
                response => {
                    response.map( book => {
                        const thisBook = this.props.myBooks.find(myBook => myBook.id === book.id);
                        thisBook
                            ? book["shelf"] = thisBook.shelf
                            : book["shelf"] = "none"
                        
                    })
                    this.setState({results:response})
                }
            );
        })
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
                                    <select value={book.shelf} onChange={s => this.props.updateShelf(book, s.target.value)}>
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




          