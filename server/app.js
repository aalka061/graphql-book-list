
const express= require ('express')
const graphqlHTTP = require('express-graphql')
const schema = require ('./schema/schema')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express();
app.use(cors())

//connect to mlab database
const dbuser = "aalkaf"
const dbpassword = "aalkaf123"
mongoose.connect (`mongodb://${dbuser}:${dbpassword}@ds245901.mlab.com:45901/graphql-aalkaf`)

mongoose.connection.once('open', ()=> {
    console.log('connected to database')
})
app.use('/graphql',graphqlHTTP({
    schema,
    graphiql: true
}))



app.listen(4000,()=>{

    console.log("now for listening for req in port 4000");
});

