const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

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

// Define a "pre" middleware to hash the password before saving
userSchema.pre('save', async function (next) {
  const user = this; // The current user document

  // Check if the password has been modified or if it's a new user
  if (!user.isModified('password')) return next();

  try {
    // Generate a salt and hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, salt);

    // Replace the plain text password with the hashed one
    user.password = hashedPassword;

    return next();
  } catch (error) {
    return next(error);
  }
});

// Create a User model
const User = model('User', userSchema);

module.exports = User;
