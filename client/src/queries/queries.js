
import {gql} from 'apollo-boost'

const getAuthorsQuery= gql`
{
    authors{
        name
        id
    }
}`


const getBooks= gql`{
        books{
            id
            name
            genre
        }
}
`
const getBookQuery=gql`
    query($id:ID){
        book(id:$id){
          name
          id
          genre
          author {
                name
                age
                books{
                    name
                    id
            }
        }
    }

    }
`

const addBookMutation=gql`
    mutation($name: String!, $genre:String!, $authorid: ID!){
        addBook(name:$name, genre: $genre, authorid:$authorid){
            name
            id
        }

    }
`




export {getAuthorsQuery, getBooks, addBookMutation,getBookQuery}