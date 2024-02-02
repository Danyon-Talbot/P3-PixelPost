const { Schema, model } = require('mongoose');

const imageSchema = new Schema({
    name: String,
    desc: String,
    img: {
        data: Buffer,
        contentType: 'String'
    }
});

module.exports = model('Image', imageSchema);