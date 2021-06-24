const Order = require('../models/order');

const OrderDao = {
    getAllOrders : orderObj => {
        return Order.find(orderObj);
    },
    getOrder : orderObj => {
        return Order.findOne(orderObj);
    },
    saveOrder : orderObj => {
        const newOrder = new Order(orderObj);
        return newOrder.save();
    },
    deleteOrder : orderObj => {
        return Order.findOneAndDelete(orderObj);
    },
    updateOrder : orderObj => {
        return orderObj.save();
    }
};

module.exports = OrderDao;