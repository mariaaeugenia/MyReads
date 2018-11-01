import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookList from './BookList';
import BookSearch from './BookSearch';

class BooksApp extends Component {
  state = {
    books: []
  };

  componentDidMount() {
    setInterval(() => {
      BooksAPI.getAll().then((books) => {
        this.setState({ books })
      })
  }, 1000)
  }
  
  updateShelf = (book, shelf) => {
    let booksUpdated = this.state.books
    book.shelf = shelf
    BooksAPI.update(book, shelf).then(response => {
        this.setState({
          books: booksUpdated
        });
      });
  };

  render() {
    const { books } = this.state;
    return (
      <div className="app">
        <Route exact path="/" render={() => <BookList books={books} updateShelf={this.updateShelf} />} />
        <Route
          path="/search"
          render={() =>
            <BookSearch updateShelf={this.updateShelf} myBooks={books} />
          }
        />
      </div>
    )
  }
}

export default BooksApp
