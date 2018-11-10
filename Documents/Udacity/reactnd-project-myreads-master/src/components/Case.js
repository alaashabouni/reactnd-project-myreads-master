import React, {Component} from 'react'
import BookShelf from "./Shelf";

class Case extends Component {
  state = {}

  componentDidMount = () => {
    this
      .props
      .onRefreshAllBooks();
  }

  updateShelves = () => {
    const newCurrentBook = {
      name: "Currently Reading",
      books: this
        .props
        .books
        .filter(book => book.shelf === 'currentlyReading')
    };

    const newWantedBook = {
      name: "Want to Read",
      books: this
        .props
        .books
        .filter(book => book.shelf === 'wantToRead')
    };

    const newReadBook = {
      name: "Read",
      books: this
        .props
        .books
        .filter(book => book.shelf === 'read')
    };

    return ([ newCurrentBook, newWantedBook, newReadBook]);
  }
    render() {
      let shelves = [];
      if (this.props.books && this.props.books.length)
        shelves = this.updateShelves();

        return (
          <div className="app">
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                  {shelves && shelves.map((shelf) => (<BookShelf
                    key={shelf.name}
                    shelf={shelf}
                    onChangeShelf={this.props.onChangeShelf}
                    />))}
              </div>
              <div className="open-search">
                <a onClick={() => this.setState({ showSearchPage: true })}>Open</a>
              </div>
            </div>
          </div>
          </div>
        )
    }
}

export default Case;
