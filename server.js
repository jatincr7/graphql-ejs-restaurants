/* eslint-disable no-unused-vars */
// eslint-disable-next-line strict
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const ejs = require('ejs');
const path = require('path');
const app = express();

const restaurants = [
    { id: 1, name: 'Thindi Caffe', description: 'Vadda Pav,Masala Tea', rating: 4.5 },
  { id: 2, name: 'The Village of India', description: 'Buffai ', rating: 4.1 },
  { id: 2, name: 'The Andhra Place', description: 'Dosa ', rating: 4.2 },
  { id: 2, name: 'The Hut', description: 'Sandwitches', rating: 5 },
  { id: 2, name: 'The Boston Pizza', description: 'Pizza ', rating: 4.7 },
  { id: 2, name: 'Riyasat', description: 'Butter Chicken ', rating: 4.8 },
  { id: 2, name: 'Jai Bhavani', description: 'Vada Pav ', rating: 4.5 },

];
// GraphQL schema
const schema = buildSchema(`
  type Restaurant {
    id: ID!
    name: String!
    description: String!
    rating: Float!
  }

  type Query {
    restaurants: [Restaurant!]!
  }
`);

//Resolver function //
const root = {
    restaurants:()=>restaurants
};



// EJS view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// GraphQL endpoint
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true, // Enable the GraphiQL interface
}));

// Server-side rendering
app.get('/', (req, res) => {
    res.render('main',
        { restaurants })
    
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port => ${PORT}`);
});