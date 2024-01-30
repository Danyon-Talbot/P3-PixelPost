const { Schema, model } = require('mongoose');

// Define the Gallery schema
const gallerySchema = new Schema({
  fileName: String,
  filePath: String,
});

// Define the User schema
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  gallery: [gallerySchema],
});

// Create a User model
const User = model('User', userSchema);

module.exports = User;
