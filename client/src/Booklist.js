import React, { Component } from 'react'
import { graphql } from 'react-apollo';
import {getBooks} from './queries/queries'
import BookDetails from './BookDetails';
import './index.css';




class Booklist extends Component {
    constructor(props){
        super(props);
        this.state = {
            selected: null
        }
    }


    displayBooks(){

        var data = this.props.data;
        if(data.loading) {
            return <div>Loading</div>
        }
        else {
            return data.books.map(book => {
                return (
                    <li key={book.id} onClick={(e) => {this.setState({selected: book.id})}}>{book.name}</li>
                )
            })
        }
    }
  render() {
    return (
      <div>
        <ul id="booklist">
            {this.displayBooks()}
        </ul>
        <BookDetails bookid={this.state.selected}/>
      </div>
    )
  }
}

export default graphql(getBooks)(Booklist)
