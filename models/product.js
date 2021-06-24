const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,   
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    productDomain: {
        type: String, //INDIA OR INTERNATIONAL
        required: true
    },
    productCategory: {
        type: String,
        required: true
    },
    genreCategory: {
        type: String,
        required: true
    },
    sizeAvailable: {
        type: Array,
        required: true 
    },
    colorsAvailable: {
        type: Array,
        required: true 
    },
    images: {
        type: Array,
        required: true
    },
    ratings: {
        type: Number,
        default: 0
    },
    numberOfReviews: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('Product', productSchema);