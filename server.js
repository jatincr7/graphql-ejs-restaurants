/* eslint-disable no-unused-vars */
// eslint-disable-next-line strict
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const ejs = require('ejs');
const path = require('path');
const app = express();

const restaurants = [
    { id: 1, name: 'Restaurant A', description: 'Delicious food', rating: 4.5 },
    { id: 2, name: 'Restaurant B', description: 'Great ambiance', rating: 4.0 },

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
  res.render('index', { restaurants });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});