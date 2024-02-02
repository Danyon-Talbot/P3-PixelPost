const User = require('../models/User');
const { signToken, AuthenticationError } = require('../utils/auth');
const { createReadStream, createWriteStream } = require("fs");
const path = require("path");
const mongoose = require('mongoose'); // Import mongoose
const fs = require('fs'); // Import fs


const resolvers = {
  Query: {
    // user: async (parent, { username }) => {
    //   return User.findOne({ username }).populate('thoughts');
    // },
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
          gallery: { images: [] },
        });
    
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
    saveToGallery: async (parent, { file }, context) => { 
      const profile = context.profile; // Destructure profile from context
      if (profile) {
        const { _id, username } = profile; // Destructure _id and username from profile
    
        try {
          console.log('ID:', _id);
          const user = await User.findById(_id);
    
          if (!user) {
            throw new Error('No User Found in Database');
          }
    
          const { createReadStream, filename } = await file;
          const ext = path.extname(filename);
          const newFilename = `${user._id}_${Date.now()}${ext}`;
          const galleryDirectory = path.join(__dirname, `../globalGallery/${username}`);
    
          // Create the gallery directory if it doesn't exist
          if (!fs.existsSync(galleryDirectory)) {
            fs.mkdirSync(galleryDirectory, { recursive: true });
          }
    
          const filePath = path.join(galleryDirectory, newFilename);
    
          // Create a write stream to save the file
          const writeStream = createWriteStream(filePath);
    
          // Pipe the read stream to the write stream
          createReadStream().pipe(writeStream);
    
          // Create an Image object
          const image = {
            _id: new mongoose.Types.ObjectId(), // Generate a new ObjectId for the image
            name: "", // Initialize name as empty string
            desc: "", // Initialize desc as empty string
            img: {
              data: newFilename, // Store the filename as data
              contentType: ext.substring(1), // Store the file extension as contentType
            },
          };
    
          // Add the image to the user's gallery.images array
          user.gallery.images.push(image);
    
          // Save the updated user document
          await user.save();
    
          return image; // Return the Image object
        } catch (error) {
          // Handle any errors that may occur during execution
          console.error('Error in saveToGallery resolver:', error);
          throw new Error('An error occurred while saving the image');
        }
      } else {
        throw new Error("User not authenticated");
      }
    },
    
  },
};

module.exports = resolvers;

