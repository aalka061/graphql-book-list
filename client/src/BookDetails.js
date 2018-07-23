import React, { Component } from 'react'
import {gql} from 'apollo-boost'
import { graphql, compose} from 'react-apollo';
import {getBookQuery} from './queries/queries'
import { options } from 'sw-toolbox';




class BookDetails extends Component {
  
  dsiplayBookDetail(){
      const {book} = this.props.data;
      if(book){
          return (
              <div id="bookdetails">
                  <h1>{book.name}</h1>   
                  <h3>{book.genre}</h3> 
                  <h3>{book.author.name}</h3> 
                  <h3>All Books by this author</h3>
                  <ul>
                     {book.author.books.map(aBook => {
                         return <li>{aBook.name}</li>
                     })}
                  </ul>


                  
                         
              </div>
          )
      }

}
  render() {
    return (
      <div>
          {this.dsiplayBookDetail()}


          
      </div>
    )
  }
}

export default graphql(getBookQuery, {
    options: (props) => {
        return {
            variables : {
                id: props.bookid
            }
        }
    }

}


)(BookDetails)
