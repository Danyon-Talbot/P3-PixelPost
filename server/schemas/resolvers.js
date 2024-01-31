const User = require('../models/User');

const resolvers = {
  Query: {
    getUser: async (_, { _id }) => {
      return await User.findById(_id);
    },
  },
  Mutation: {
    createUser: async (_, { username, email, password }) => {
      try {
        // Check if the username is already in use
        const existingUser = await User.findOne({ username });
        if (existingUser) {
          throw new Error('Username is already taken.');
        }

        // Create and save the new user without hashing the password
        const newUser = new User({
          username,
          email,
          password, // Note: The password is not hashed
        });

        const createdUser = await newUser.save();
        return createdUser;
      } catch (error) {
        throw new Error(`Error creating user: ${error.message}`);
      }
    },
  },
};

module.exports = resolvers;

