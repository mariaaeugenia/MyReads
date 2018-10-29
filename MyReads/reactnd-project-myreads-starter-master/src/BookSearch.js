import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI'

class BookSearch extends Component {

    state = {
        query: '',
        results: [],
    }

    searchBooks = () => {
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

    updateShelf = (book, shelf) => {
        let booksUpdated = this.props.books
        book.shelf = shelf
        BooksAPI.update(book, shelf).then(response => {
            this.setState({
              books: booksUpdated
            });
          });
      };

    render() {
        return(
            <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search">Close</a>
              <div className="search-books-input-wrapper">
                <input type="text" placeholder="Search by title or author"
                    ref={input => this.search = input}
                    onChange={this.searchBooks}
                />
              </div>
            </div>
            <div className="search-books-results">
            { this.state.results.length > 0 && (
                <ol className="books-grid">
                    {this.state.results.map((book) => 
                        <li key={book.id} className="book">
                            <div className="book-top">
                                <div className="book-cover" style={{ 
                                    width: 128, height: 193, 
                                    backgroundImage: "url(" + book.imageLinks.thumbnail + ")" }}>
                                </div>
                                <div className="book-shelf-changer">
                                    <select value={book.shelf} onChange={s => this.updateShelf(book, s.target.value)}>
                                    <option value="move" disabled>Move to...</option>
                                    <option value="currentlyReading">Currently Reading</option>
                                    <option value="wantToRead">Want to Read</option>
                                    <option value="read">Read</option>
                                    <option value="none">None</option>
                                    </select>
                                </div>
                            </div>
                            <div className="book-title">{book.title}</div>
                            {book.authors.length > 0 && (
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




          