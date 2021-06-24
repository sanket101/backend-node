const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    description: {
        type: String,
        default: ''
    },
    ratings: {
        type: Number,
        required: true,
        default: 0
    }
});

module.exports = mongoose.model('Review', reviewSchema);