const { User, Image } = require('../models/index');
const { signToken, AuthenticationError } = require('../utils/auth');
// const { GraphQLUpload } = require('graphql-upload/GraphQLUpload.mjs');
const { createReadStream, createWriteStream } = require("fs");
const path = require("path");
const fs = require('fs');
const { atob } = require('atob');

const resolvers = {
  // Upload: GraphQLUpload,

  Query: {
    userAll: async () => {
      return await User.find({})
    },
    getUserGallery: async (_, { username }) => {
      try {
        // Find the user by username
        const user = await User.findOne({ username }).populate('gallery');
        
        if (!user) {
          return [];
        }
    
        // Extract and return the images from the user's gallery
        return user.gallery;
      } catch (error) {
        console.error('Error fetching user gallery:', error);
        throw new Error('Failed to fetch user gallery');
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
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },
    saveImage: async (_, { input }) => {
      try {
        const { base64Image, filename, contentType, owner } = input;
    
        // Decode base64 data
        const binaryData = Buffer.from(base64Image, 'base64');
    
        // Create a new instance of the Image model
        const newImage = new Image({
          filename,
          contentType,
          owner,
          data: binaryData,
          owner,
        });
    
        // Save the image to the database
        await newImage.save();
    
        // Return a response indicating success
        return {
          success: true,
          message: 'Image saved successfully',
        };
      } catch (error) {
        console.error('Error saving image:', error);
        return {
          success: false,
          message: 'Failed to save image',
          // Handle the error and return an appropriate response
        };
      }
    },


  },
};

module.exports = resolvers;

