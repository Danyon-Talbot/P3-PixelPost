const User = require('../models/User'); 

const resolvers = {
  Query: {
    getUser: async (_, { _id }) => {
      return await User.findById(_id);
    },
  },
  Mutation: {
    createUser: async (_, { username, email, password }) => {
      const newUser = new User({
        username,
        email,
        password, 
      });

      // Save the user to the database
      return await newUser.save();
    },
  },
};

module.exports = resolvers;

