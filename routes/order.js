const express = require('express');

const orderController = require('../controllers/order');

const router = express.Router();

const { body } = require('express-validator');

// POST /orders/add-order
router.post('/add-order', 
    body('userId').isMongoId(),
    body('productId').isMongoId(),
    body('quantity').isNumeric().custom(value => {
        if(value <= 0){
            return Promise.reject('Incorrect Ratings');
        }
    }),
    body('size').not().isEmpty().trim(),
    body('color').not().isEmpty().trim(),
    body('status').not().isEmpty().trim(),
    orderController.addOrder
);

// POST /orders/get-orders
router.post('/get-orders', 
    body('filterParameter').custom(value => {
        if(!value) {
            return Promise.reject('Paramters Missing');
        }        
        if(value !== 'PRODUCT' || value !== 'USER') {
            return Promise.reject('Incorrect Parameter');
        }
    }),
    body('uniqueId').isMongoId(),
    orderController.getOrders
);

// POST /orders/update-order
router.put('/update-order/:orderId',
    body('quantity').isNumeric().custom(value => {
        if(value <= 0){
            return Promise.reject('Incorrect Ratings');
        }
    }),
    body('size').not().isEmpty().trim(),
    body('color').not().isEmpty().trim(),
    body('status').not().isEmpty().trim(),
    orderController.updateOrder
);

// POST /orders/delete-order
router.delete('/delete-review/:orderId',
    orderController.deleteOrder
);

module.exports = router;