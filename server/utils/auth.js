const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || 'testSecret';
const expiration = '2h';

module.exports = {
AuthenticationError: new GraphQLError('Could not authenticate user.', {
    extensions: {
      code: 'UNAUTHENTICATED',
    },
  }),
  authMiddleware: function ({ req }) {
    let token = req.body.token || req.query.token || req.headers.authorization;

    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    if (!token) {
      console.log('Token not found in request.');
      return {}; // Return an empty object if no token is found
    }

    try {
      const { authenticatedPerson } = jwt.verify(token, secret, { maxAge: expiration });
      console.log('Authenticated user:', authenticatedPerson);
      return { user: authenticatedPerson }; // Set the user field in context
    } catch (error) {
      console.log('Invalid token:', error);
      throw new Error('Invalid Token');
    }
  },
  
  
  signToken: ({ email, username, _id }) => {
    const payload = { email, username, _id };
    return jwt.sign({ authenticatedPerson: payload }, secret, { expiresIn: '2h' });
  },
};
