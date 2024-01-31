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
  
  signToken: function ({ email, username, _id }) {
    const payload = { email, username, _id };
    console.log('Secret:', secret);
    console.log('Payload:', payload);
    console.log('Expiration:', expiration);
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
    },
  
};
