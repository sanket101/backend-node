const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const invoiceSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    orderDate: {
        type: Date,
        default: Date.now
    },
    orders: {
        type: Array,
        default: []
    },
    giftWrap: {
        type: Boolean,
        default: false
    },
    giftMessage: {
        type: String,
        default: ''
    },
    additionalComments: {
        type: String,
        default: ''
    },
    totalOrderAmount: {
        type: Number,
        required: true
    },
    shippingAmount: {
        type: Number,
        required: true
    },
    taxAmount: {
        type: Number,
        required: true
    },
    discountCode: {
        type: String,
        default: ''
    },
    discountAmount: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('Invoice', invoiceSchema);