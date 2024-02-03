const { User, Image } = require('../models/index');
const { signToken, AuthenticationError } = require('../utils/auth');
// const { GraphQLUpload } = require('graphql-upload/GraphQLUpload.mjs');
const { createReadStream, createWriteStream } = require("fs");
const path = require("path");
const fs = require('fs'); // Import fs

const resolvers = {
  // Upload: GraphQLUpload,

  Query: {
    userAll: async () => {
      return await User.find({})
    }
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
    saveToGallery: async (parent, { file }, context) => { 
      const profile = context.profile;
      if (profile) {
        const { _id, username } = profile;
    
        try {
          const user = await User.findById(_id);
    
          if (!user) {
            throw new Error('No User Found in Database');
          }
    
          const { createReadStream, filename } = await file;
          const ext = path.extname(filename);
          const newFilename = `${user._id}_${Date.now()}${ext}`;
          const galleryDirectory = path.join(__dirname, `../globalGallery/${username}`);
    
          if (!fs.existsSync(galleryDirectory)) {
            fs.mkdirSync(galleryDirectory, { recursive: true });
          }
    
          const filePath = path.join(galleryDirectory, newFilename);
          const writeStream = createWriteStream(filePath);
    
          createReadStream().pipe(writeStream);
    
          const image = new Image({
            filename: newFilename,
            contentType: ext.substring(1), // Remove the dot from the extension
            path: filePath,
          });
    
          await image.save();
    
          user.gallery.push(image); // Push the image object into the user's gallery array
    
          await user.save();
    
          return image; // Return the Image object
        } catch (error) {
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

