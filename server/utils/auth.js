const { AuthenticationError } = require('@apollo/server');
const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || 'testSecret';
const expiration = '2h';

module.exports = {
  AuthenticationError,
  authMiddleware: function ({ req }) {
    let token = req.headers.authorization || '';

    if (token.startsWith('Bearer ')) {
      token = token.slice(7, token.length).trim();
    }

    if (!token) {
      return req;
    }

    try {
      const { authenticatedPerson, exp } = jwt.verify(token, secret);

      if (exp < Date.now() / 1000) {
        throw new AuthenticationError('Token has expired');
      }

      req.user = authenticatedPerson;
    } catch (error) {
      throw new AuthenticationError('Invalid token');
    }

    return req;
  },
  signToken: function ({ email, username, _id }) {
    const payload = { email, username, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
