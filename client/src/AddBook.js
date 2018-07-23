import React, { Component } from 'react'
import {gql} from 'apollo-boost'
import { graphql, compose} from 'react-apollo';
import {getAuthorsQuery, addBookMutation, getBooks} from './queries/queries'




class AddBook extends Component {
  constructor(){
    super();
    this.state = {
      name: '',
      genre:'',
      authorid:''
    }
  }

  selectAuthors(){
    var data = this.props.getAuthorsQuery;

    if(data.loading){
      return <option></option>
    }else {
      return data.authors.map(author => {
        return <option key={author.id} value={author.id}>{author.name}</option>
      })
    }
  }
  handleBookAdditionRequest(e){
    e.preventDefault();

    this.props.addBookMutation({
      variables: {
        name: this.state.name,
        genre: this.state.genre,
        authorid: this.state.authorid
      }, 
      refetchQueries:[
        {
          query: getBooks
        }
      ]
    });


  }
  
  render() {
    return (
      <div>
        <form onSubmit={this.handleBookAdditionRequest.bind(this)} id="add-book">
          <div className="field">
            <label>Book Name</label>
            <input type="text" onChange={(e)=> {this.setState({name: e.target.value})}}/>
          </div>

           <div className="field">
            <label>Genre</label>
            <input type="text"  onChange={(e)=> {this.setState({genre: e.target.value})}} />
          </div>

           <div className="field">
            <label>Author</label>
             <select  onChange={(e)=> {this.setState({authorid: e.target.value})}}> 
               <option>Select Author</option>
               {this.selectAuthors()}

             </select>
          </div>
          <button>+</button>


        </form>

          
      </div>
    )
  }
}

export default compose (
  graphql(getAuthorsQuery, {name: "getAuthorsQuery"}),
  graphql(addBookMutation, {name: "addBookMutation"}),
)(AddBook)
