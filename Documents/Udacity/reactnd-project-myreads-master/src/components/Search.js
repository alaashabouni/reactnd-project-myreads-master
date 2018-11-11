import React, {Component} from 'react'
import {Link} from 'react-router-dom';
import * as BooksAPI from '../BooksAPI';
import * as Sorting from '../Sorting';
import Book from './Book';

class Search extends Component {
  state = {
    query:"",
    books: [],
  };

  queryTimer = null;

  changeQuery = (value) => {
    clearTimeout(this.queryTimer);
    this.setState({query:value});
    this.queryTimer = setTimeout(this.updateSearch, 250);
  }

  updateSearch = () => {
    if (this.state.query === "") {
      this.setState({error: false, books: []});
      return;
    }

    BooksAPI.search(this.state.query).then(response => {
        let newList = [];
        let newError = false;
        if (response === undefined || (response.error && response.error !== "empty query")) {
          newError = true;
        } else if (response.length) {
          newList = Sorting.mergeShelfAndSearch(this.props.selectedBooks, response);
          newList = Sorting.sortAllBooks(newList);
        }
        this.setState({error: newError, books: newList});
      })
  }

  componentWillReceiveProps = (props) => {
    this.props = props;
    let newList = Sorting.mergeShelfAndSearch(this.props.selectedBooks, this.state.books);
    newList = Sorting.sortAllBooks(newList);
    this.setState({books: newList});
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to='/' className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={(e) => this.changeQuery(e.target.value)}
              value={this.state.query.value}/>
          </div>
        </div>
        <div className="search-books-results">
            {this.state.error && (
                <div className="search-error">
                  There was a problem wiht your search</div>
            )}

          <ol className="books-grid">
            {this.state.books && this
              .state
              .books
              .map(book => (
                <li key={book.id}>
                  <Book
                    book={book}
                    onChangeShelf={this.props.onChangeShelf}/>
                </li>
              ))
            }
          </ol>
        </div>
      </div>
    )
  }
}

export default Search;
