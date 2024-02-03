const { Schema, model } = require('mongoose');

const imageSchema = new Schema({
  filename: String,
  contentType: {
    type: String,
    enum: ['image/png'], // Add more supported image types if needed
  },
  owner: String,
  data: Buffer, // Store the image data as a Buffer
});

const Image = model('Image', imageSchema);

module.exports = Image;
