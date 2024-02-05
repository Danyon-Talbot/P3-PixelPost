const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat.js');


const imageSchema = new Schema({
  filename: String,
  contentType: {
    type: String,
    enum: ['image/png'], // Add more supported image types if needed
  },
  owner: String,
  data: Buffer, // Store the image data as a Buffer
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
});

const Image = model('Image', imageSchema);

module.exports = Image;
