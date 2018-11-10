import React from 'react'
import {Route} from 'react-router-dom';

import * as BooksAPI from './BooksAPI'
import * as Sorting from './Sorting';

import './App.css'
import Case from './components/Case';
import Search from './components/Search'


class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false
  }

  componentDidMount = () => {
    if (this.state.newBook) {
      this.refreshAllBooks();
    }
   }

   refreshAllBooks = () => {
     BooksAPI
     .getAll()
     .then((list) => {
       this.setState({
         books: Sorting.sortAllBooks(list),
         newBook: false
        });
       });
     }

  changeShelf = (book, shelf) => {
    BooksAPI
      .update(book, shelf)
      .then(response => {
        let newList = this
        .state
        .books
        .slice(0);

        const books = newList.filter(listBook => listBook.id === book.id);
        if (books.length) {
          books[0].shelf = shelf;
        } else {
          newList.push(book);
          newList = Sorting.sortAllBooks(newList);
        }
        this.setState({books: newList});
      })
  }

  render() {
    return (
      <div className="app">
        <Route
          exact
          path='/'
          render={(() => (<Case
            books={this.state.books}
            onChangeShelf={this.changeShelf}
            onRefreshAllBooks={this.refreshAllBooks}/>))}/>

        <Route
          exact
          path='/search'
          render={(() => (<Search
            selectedBooks={this.state.books}
            onChangeShelf={this.changeShelf}/>))}/>
      </div>
    )
  }
}

export default BooksApp
