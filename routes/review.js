const express = require('express');

const reviewController = require('../controllers/review');

const router = express.Router();

const { body } = require('express-validator');

// POST /reviews/add-review
router.post('/add-review', 
    body('userId').not().isEmpty().trim(),
    body('productId').not().isEmpty().trim(),
    body('description').isString(),
    body('ratings').isNumeric().custom(value => {
        if(value <= 0 && value > 5){
            return Promise.reject('Incorrect Ratings');
        }
    }),
    reviewController.addReview);

// POST /reviews/get-reviews
router.post('/get-reviews', 
    body('filterParameter').custom(value => {
        if(!value) {
            return Promise.reject('Paramters Missing');
        }        
        if(value !== 'PRODUCT' || value !== 'USER') {
            return Promise.reject('Incorrect Parameter');
        }
    }),
    body('uniqueId').isMongoId(),
    reviewController.getReviews);

// POST /reviews/update-review
router.put('/update-review/:reviewId',
    body('description').isString(),
    body('ratings').isNumeric().custom(value => {
        if(value <= 0 && value > 5){
            return Promise.reject('Incorrect Ratings');
        }
    }),
    reviewController.updateReview);

// POST /reviews/delete-review
router.delete('/delete-review/:reviewId',
    reviewController.deleteReview
);

module.exports = router;