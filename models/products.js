const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productsSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    stock: {
        type: String,
        require: true
    },
    category: {
        type: String,
        required: true
    },
    image: {
        type: Buffer,
        required: true
    }
});

module.exports = mongoose.model('Products', productsSchema);