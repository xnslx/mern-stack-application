const express = require('express');
const { body } = require('express-validator');
const router = express.Router();

const authController = require('../controllers/auth');
const User = require('../models/users');

router.get('/signup', authController.getSignup)

router.post('/signup', [
    body('name')
    .trim(),
    body('email')
    .isEmail()
    .withMessage('Please enter a valid email')
    .custom((value, { req }) => {
        return User.findOne({ email: value })
            .then(userDoc => {
                if (userDoc) {
                    return Promise.reject('E-mail already in use')
                }
            })
    })
], authController.postSignup)

router.get('/login', authController.getLogin);

router.post('/login', [
    body('email')
    .isEmail()
    .withMessage('Please enter a valid email.')
    .normalizeEmail(),
    body('password', 'Password has to be valid.')
    .isLength({ min: 5, max: 20 })
    .isAlphanumeric()
    .trim()

], authController.postLogin);

router.post('/logout', authController.postLogout)


module.exports = router;