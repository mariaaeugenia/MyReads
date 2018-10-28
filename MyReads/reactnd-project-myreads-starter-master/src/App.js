import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookList from './BookList';

class BooksApp extends Component {
  state = {
    books: []
  };

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => <BookList books={this.state.books} />} />
      </div>
    )
  }
}

export default BooksApp
