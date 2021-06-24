const express = require('express');

const addressController = require('../controllers/address');

const router = express.Router();

const { body } = require('express-validator');

// POST /address/save-address
router.post('/save-address', 
    body('tag').not().isEmpty().trim(),
    body('city').not().isEmpty().trim(),
    body('state').not().isEmpty().trim(),
    body('country').not().isEmpty().trim(),
    body('pincode').not().isEmpty().trim(),
    body('deliveryAddress').not().isEmpty().trim(),
    body('phoneNumber').not().isEmpty().trim(),
    body('name').not().isEmpty().trim(),
    body('userId').not().isEmpty().trim(),
    addressController.saveAddress);

// POST /address/get-address
router.post('/get-address', 
    body('userId').not().isEmpty().trim(),
    addressController.getAllAddresses);

// POST /address/update-address
router.put('/update-address/:addressId',
    body('tag').not().isEmpty().trim(),
    body('city').not().isEmpty().trim(),
    body('state').not().isEmpty().trim(),
    body('country').not().isEmpty().trim(),
    body('pincode').not().isEmpty().trim(),
    body('deliveryAddress').not().isEmpty().trim(),
    body('phoneNumber').not().isEmpty().trim(),
    body('name').not().isEmpty().trim(),
    addressController.updateAddress);

// POST /address/delete-address
router.post('/delete-address', 
    body('addressId').not().isEmpty().trim(),
    addressController.deleteAddress);

module.exports = router;