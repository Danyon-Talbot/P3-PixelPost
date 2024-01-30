const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const path = require('path');

const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const PORT = process.env.PORT || 3007;
const server = new ApolloServer({
    typeDefs,
    resolvers
});

const app = express();

// Serve static files from the 'dist' directory
app.use(express.static(path.join(__dirname, 'client/dist')));

// Apollo Server middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/graphql', expressMiddleware(server));

// Handle all other routes by serving the 'index.html' file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/dist/index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Internal Server Error' });
});

db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}`);
        console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    })
});
