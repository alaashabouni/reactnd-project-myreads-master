import React, {Component} from 'react'
import Shelf from "./Shelf";

class Case extends Component {
  state = {
  }


    render() {
        return (
          <div className="app">
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                  <Shelf/>
              </div>
              <div className="open-search">
                <a onClick={() => this.setState({ showSearchPage: false })}>Close</a>
              </div>
            </div>
          </div>
          </div>
        )
    }
}

export default Case;
