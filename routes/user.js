const express = require('express');

const userController = require('../controllers/user');

const router = express.Router();

const { body } = require('express-validator');

// GET /user/login
router.post('/login', userController.getUser);

// POST /user/register
router.post('/register', 
    body('name').isAlpha(), 
    body('email').isEmail().normalizeEmail(), 
    body('password').isLength({min: 8}), 
    userController.createUser);

// DELETE /user/delete
router.delete('/delete', 
    body('email').isEmail().normalizeEmail(),
    body('userId').isString(),
    userController.deleteUser);

// router.put('/update',
//     body('name').isAlpha(), 
//     body('email').isEmail().normalizeEmail(), 
//     body('password').isLength({min: 8}),
//     userController.updateUser);

module.exports = router;