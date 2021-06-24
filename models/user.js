const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    isEmailVerfied: {
        type: Boolean,
        default: false
    },
    phone: {
        type: String,
        default : ''
    },
    isPhoneVerified: {
        type: Boolean,
        default: false
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    usertags: {
        type: Array,
        default: []
    },
    loyaltyPoints: {
        type: Number,
        default: 0
    },
    cartProducts: {
        type: Array,
        default: []
    }
});

module.exports = mongoose.model('User', userSchema);