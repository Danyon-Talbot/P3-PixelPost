const { User, Image } = require('../models/index');
const { signToken, AuthenticationError } = require('../utils/auth');
const { Buffer } = require('buffer');


const resolvers = {
  Query: {
    userAll: async () => {
      return User.find().populate('gallery')
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('gallery');
      }
      throw AuthenticationError;
    },
    allImages: async () => {
      try {
        const images = await Image.find();
        return images;
      } catch (error) {
        throw new Error(`Failed to fetch all images: ${error.message}`);
      }
    },
    userImages: async (_, __, context) => {
      try {
        if (!context.user) {
          throw new Error('User not authenticated');
        }
    
        const user = await User.findById(context.user._id).populate('gallery');
        if (!user) {
          throw new Error('User not found');
        }
    
        // Convert binary image data to base64 for each image in the user's gallery
        const userGallery = user.gallery.map((image) => ({
          _id: image._id,
          filename: image.filename,
          contentType: image.contentType,
          owner: image.owner,
          data: image.data.toString('base64'), // Convert binary data to base64
          createdAt: image.createdAt,
        }));
    
        return userGallery;
      } catch (error) {
        throw new Error(`Failed to fetch user images: ${error.message}`);
      }
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
        throw new Error('User not found');
      }
    
      const correctPw = await user.isCorrectPassword(password);
    
      if (!correctPw) {
        throw new AuthenticationError('Incorrect password');
      }
    
      // Generate a JWT token with user information
      const token = signToken(user);
    
      // Send the token in the response along with user data
      return { token, user };
    },
    
    saveImage: async (_, { base64Image, filename, contentType, owner }, context) => {
      try {
        // Decode base64 data
        const binaryData = Buffer.from(base64Image, 'base64');
    
        // Check if the user is authenticated
        if (context.user) {
          const newImage = await Image.create({
            filename,
            contentType,
            data: binaryData, // Save the binary data in the 'data' field
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
          throw new Error('User not authenticated');
        }
      } catch (error) {
        console.error('Error saving image:', error);
    
        return {
          success: false,
          message: 'Failed to save image',
          error: error.message,
        };
      }
    },
    updateUser: async (_, { username, email, password }, context) => {
      try {
        if (!context.user) {
          throw new Error('User not authenticated');
        }

        const updatedFields = {};

        if (username) {
          updatedFields.username = username;
        }

        if (email) {
          updatedFields.email = email;
        }

        if (password) {
          updatedFields.password = password;
        }

        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $set: updatedFields },
          { new: true }
        );

        return updatedUser;
      } catch (error) {
        console.error('Error updating user:', error);
        throw new Error('An error occurred while updating the user');
      }
    },
    
    
  },
};

module.exports = resolvers;

