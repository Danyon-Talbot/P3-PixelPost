const User = require('../models/User'); 
const { hashPassword } = require('../utils/auth'); // Import the utility


const resolvers = {
  Query: {
    getUser: async (_, { _id }) => {
      return await User.findById(_id);
    },
  },
  Mutation: {
    createUser: async (_, { username, email, password }) => {
      try {
        // Hash the password using the utility function
        const hashedPassword = await hashPassword(password);

        const newUser = new User({
          username,
          email,
          password: hashedPassword, // Use the hashed password
        });

        // Save the user to the database
        const createdUser = await newUser.save();

        return createdUser; // Return the created user
      } catch (error) {
        throw new Error(`Error creating user: ${error.message}`);
      }
    },
  },
};

module.exports = resolvers;
