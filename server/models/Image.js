const { Schema, model } = require('mongoose');


const imageSchema = new Schema({
    filename: String,
    contentType: {
      type: String,
      enum: ['image/png'],
    },
    path: String,
});

const Images = model('Image', imageSchema);

module.exports = Images;