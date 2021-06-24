const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const addressSchema = new Schema({
    tag: {
        type: String,
        required: true,
        default: 'HOME'
    },
    city: {
        type: String,   
        required: true,
        default: ''
    },
    state: {
        type: String,
        required: true,
        default: ''
    },
    country: {
        type: String,
        required: true,
        default: ''
    },
    pincode: {
        type: String,
        required: true,
        default: ''
    },
    deliveryAddress: {
        type: String,
        required: true,
        default: ''
    },
    landmark: {
        type: String,
        default: ''
    },
    name: {
        type: String,
        required: true,
        default: ''
    },
    phoneNumber: {
        type: String,
        default : ''
    },
    isPhoneNumberVerified: {
        type: Boolean,
        default: false
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Address', addressSchema);