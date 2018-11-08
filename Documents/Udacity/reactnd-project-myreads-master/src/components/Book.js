import React, {Component} from 'react'
import Changer from "./Changer";

class Book extends Component {
  state = {
    shelfSelection: this.props.book.shelf || "none"
  }

  render() {
    const authors = this.props.book.authors && this
      .props
      .book
      .authors
      .join(' | ');

    let url = (this.props.book.imageLinks && 'url(${this.props.book.imageLinks.thumbnail})');


    return (
      <li>
        <div className="book">
          <div className="book-top">
            <button
              className="book-cover-button"
              <div
                className="book-cover"
                style={{
                width: 128,
                height: 193,
                backgroundImage: 'url("http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api")'
              }}></div>
            </button>
            <Changer/>
          </div>
          <div className="book-title">{this.props.book.title}</div>
          <div className="book-authors">{authors}</div>
        </div>
      </li>
    )
  }
}

export default Book;
