import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Booklist from './Booklist';
import ApolloClient from 'apollo-boost'
import {ApolloProvider} from 'react-apollo'
import AddBook from './AddBook';

//apolloclient setup
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
})




class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
         <div>
            <h1>Reading List</h1>
            <Booklist/>
            <AddBook/>
         </div>
      </ApolloProvider>
     
    );
  }
}

export default App;
