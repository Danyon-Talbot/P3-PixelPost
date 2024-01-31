const User = require('../models/User');
const { signToken, AuthenticationError } = require('../utils/auth');
const { ApolloError } = require('@apollo/server/errors')


const resolvers = {
  Query: {
    // user: async (parent, { username }) => {
    //   return User.findOne({ username }).populate('thoughts');
    // },
  },
  Mutation: {
    createUser: async (parent, { username, email, password }) => {
      const oldUser = await User.findOne({ email });

      if (oldUser) {
        throw new ApolloError('This email is already registered' + email, 'USER_ALREADY_EXISTS');
      }
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },
  },
};

module.exports = resolvers;

