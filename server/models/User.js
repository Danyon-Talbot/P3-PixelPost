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
    default: null
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'Must match an email address!'],
  },
  password: {
    type: String,
    required: true,
  },
  gallery: [gallerySchema],
});

// Define a pre-save hook to hash the password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    // If the password is not modified, move to the next middleware
    return next();
  }

  try {
    // Generate a salt and hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    
    // Replace the plain password with the hashed password
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.isCorrectPassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    return false;
  }
};


// Create a User model
const User = model('User', userSchema);

module.exports = User;
