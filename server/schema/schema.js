const graphql = require('graphql');
const Author = require('../models/Author')
const Book = require('../models/Book')




const{
    GraphQLObjectType,
    GraphQLString, GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList
    }
 = graphql;
const _= require('lodash')


// //dummy data
// var books =[
//     {name: 'Name the wind', genre: "Fantacy",authorid: "2", id:"1"},
//     {name: 'Superman', genre: "action",authorid: "3", id:"2"},
//     {name: 'Black list', genre: "darama",authorid:"1", id:"3"},
//     {name: 'no way', genre: "comedy",authorid:"2", id:"4"}


// ];

// var authors =[
//     {name: 'Abdul', age: 20, id:"1"},
//     {name: 'Ahmed', age:25, id:"2"},
//     {name: 'Ali', age: 40, id:"3"}

// ];


const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id : {type: GraphQLID},
        name: {type: GraphQLString},
        age : {type: GraphQLInt},
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                return Book.find({authorid: parent.id})

             }
        }
    })

})

const BookType = new GraphQLObjectType({

    name:'Book',
    fields:()=>({
        id: {type:GraphQLID},
        name: {type:GraphQLString},
        genre: {type:GraphQLString},
        author: {
            type:AuthorType,
            resolve(parent,args){
                return Author.findById(parent.authorid)
            }

        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: "RootQuery",
    fields: {
        book: {
            type:BookType,
            args: {id:{type: GraphQLID}},
            resolve(parent, args){
                //code to get data from db
                return  Book.findById(args.id)
            }
        },
         author: {
             type: AuthorType,
             args: {id: {type: GraphQLID}},
             resolve(parent,args){
              //   return _.find(authors,{id: args.id})
              return Author.findById(args.id)           
              }
         },

         books: {
             type: new GraphQLList(BookType),
             resolve(){
                // return books;
                return Book.find({});
             }
         },
         authors: {
            type: new GraphQLList(AuthorType),
            resolve(){
                return Author.find({});
            }
        },


    }
})

const Mutation = new GraphQLObjectType({

    name: 'Mutation',
    fields:{
        addAuthor:{
            type: AuthorType,
            args:{
                name: {type: GraphQLString},
                age: {type: GraphQLInt}
            },
            resolve(parent,args){
                let author = new Author({
                    name: args.name,
                    age: args.age
                });
                return author.save();
            }
        },
        addBook:{
            type: BookType,
            args: {
                name: {type: GraphQLString},
                genre: {type: GraphQLString},
                authorid: {type: GraphQLID}
            },
            resolve(parent, args){
                let book = new Book({
                    name: args.name,
                    genre: args.genre,
                    authorid: args.authorid

                    }
                )
                return book.save()
            }
        }



    }
})
module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})