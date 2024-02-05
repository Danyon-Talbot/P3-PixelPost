const { User, Image } = require('../models/index');
const { signToken, AuthenticationError } = require('../utils/auth');
const path = require("path");
const { atob } = require('atob');

const resolvers = {
  Query: {
    userAll: async () => {
      return await User.find({})
    },
    images: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Image.find(params).sort({ createdAt: -1 });
    },
    getUserGallery: async (parent, arg, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('gallery');
      }
      throw new AuthenticationError('Could not authenticate user.', {
        code: 'UNAUTHENTICATED',
      });
    }, 
  },
  Mutation: {
    createUser: async (parent, { username, email, password }) => {
      try {
        const oldUser = await User.findOne({ email });
    
        if (oldUser) {
          throw new Error('This email is already registered', 'USER_ALREADY_EXISTS');
        }
    
        // Initialize the user object with an empty gallery
        const user = await User.create({
          username,
          email,
          password,
        });
        
        // Creates token based on the user data
        const token = signToken(user);
        return { token, user };
      } catch (error) {
        console.error('Error creating user:', error);
        throw new Error('An error occurred while creating the user', 'USER_CREATION_ERROR', error);
      }
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
    saveImage: async (_, { input }, context) => {
      console.log('Context', context);
      console.log('Save Image Decoded Token', context.user);
      try {
        const { base64Image, filename, contentType, owner } = input;
        // Decode base64 data
        const binaryData = Buffer.from(base64Image, 'base64');
       
    
        // Check if the user is authenticated
        if (context.user) { // Ensure context.user is not falsy
          const newImage = await Image.create({
            filename,
            contentType,
            data: binaryData,
            owner,
          });
    
          await User.findOneAndUpdate(
            { _id: context.user._id },
            { $addToSet: { gallery: newImage._id } }
          );

          return {
            success: true,
            message: 'Image saved successfully',
            newImage
          };
          
        } else {
          // Handle the case when the user is not authenticated
          throw new Error('User not authenticated');
        }
      } catch (error) {
        console.error('Error saving image:', error);
    
        // Handle the error and return an appropriate response
        return {
          success: false,
          message: 'Failed to save image',
          error: error.message, // Include the error message for debugging
        };
      }
    },
    
    
  },
};

module.exports = resolvers;

