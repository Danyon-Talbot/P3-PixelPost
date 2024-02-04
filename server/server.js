const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4')
const path = require('path');
const { authMiddleware } = require('./utils/auth');

const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const PORT = process.env.PORT || 3007;
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    authMiddleware({ req });
  },
});

const app = express();

const startApolloServer = async () => {
  await server.start();

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  app.use('/graphql', expressMiddleware(server));

  if (process.env.NODE_ENV === 'production') {
    // Use the dynamic path based on the environment
    const clientPath = path.join(__dirname, './client/dist');
    app.use(express.static(clientPath));
  } else {
    // In local development, use the correct path
    app.use(express.static(path.resolve('./client/dist')));
  }

  app.get('*', (req, res) => {
    // Send the index.html file from the correct path
    const clientIndexPath = path.join(__dirname, './client/dist/index.html');
    res.sendFile(clientIndexPath);
  });
  
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
};

startApolloServer();
