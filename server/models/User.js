const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');


// Define the User schema
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
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
    minlength: 8,
  },
  gallery: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Image'
    },
  ],
});

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
