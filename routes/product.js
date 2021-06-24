const express = require('express');

const productController = require('../controllers/product');

const router = express.Router();

const { body } = require('express-validator');

// POST /product/save-product
router.post('/save-product', 
    body('name').not().isEmpty().trim(),
    body('description').not().isEmpty().trim(),
    body('price').not().isEmpty().trim(),
    body('productDomain').not().isEmpty().trim(),
    body('productCategory').not().isEmpty().trim(),
    body('genreCategory').not().isEmpty().trim(),
    body('sizeAvailable').isArray().isLength({min: 1}),
    body('colorsAvailable').isArray().isLength({min: 1}),
    body('images').isArray().isLength({min: 1}),
    productController.saveProduct
);

// POST /product/get-products
router.post('/get-products',
    body('productDomain').not().isEmpty().trim(),
    productController.getProductsDomainWise
);

// POST /product/update-product
router.put('/update-product/:productId', 
    body('name').not().isEmpty().trim(),
    body('description').not().isEmpty().trim(),
    body('price').not().isEmpty().trim(),
    body('productDomain').not().isEmpty().trim(),
    body('productCategory').not().isEmpty().trim(),
    body('genreCategory').not().isEmpty().trim(),
    body('sizeAvailable').isArray().isLength({min: 1}),
    body('colorsAvailable').isArray().isLength({min: 1}),
    body('images').isArray().isLength({min: 1}),
    productController.updateProduct
);

// POST /product/delete-product
router.delete('/delete-product', 
    body('productId').not().isEmpty().trim(),
    productController.deleteProduct
);

module.exports = router;