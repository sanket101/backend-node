const Review = require('../models/review');

const ReviewDao = {
    getAllReviews : reviewObj => {
        return Review.find(reviewObj);
    },
    getReview : reviewObj => {
        return Review.findOne(reviewObj);
    },
    saveReview : reviewObj => {
        const newReview = new Review(reviewObj);
        return newReview.save();
    },
    deleteReview : reviewObj => {
        return Review.findOneAndDelete(reviewObj);
    },
    updateReview : reviewObj => {
        return reviewObj.save();
    }
};

module.exports = ReviewDao;