const express = require('express');
const { ApolloServer } = require('@apollo/server-express');
const path = require('path');

const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const PORT = process.env.PORT || 3007;
const app = express();

// Serve static files from the 'dist' directory
app.use(express.static(path.join(__dirname, 'client/dist')));

// Create an instance of Apollo Server
const server = new ApolloServer({
    typeDefs,
    resolvers
});

const startApolloServer = async () => {
    await server.start();

    server.applyMiddleware({ app, path: '/graphql' }); // Use this middleware after server.start()

    db.once('open', () => {
        app.listen(PORT, () => {
            console.log(`API server running on port ${PORT}`);
            console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
        });
    });
};

startApolloServer();
