const express = require('express');
const { check, body } = require('express-validator');
const router = express.Router();

const authController = require('../controllers/auth');
const User = require('../models/users');
const isAuth = require('../middleware/is-auth');

router.get('/signup', authController.getSignup)

router.post('/signup', [
    body('name')
    .trim(),
    check('email')
    .isEmail()
    .withMessage('Please enter a valid email')
    .custom((value, { req }) => {
        console.log('value', value)
        return User.findOne({ email: value })
            .then(userDoc => {
                if (userDoc) {
                    return Promise.reject('E-mail already in use')
                }
            })
    })
    .normalizeEmail(),
    body('password', 'Password has to be valid.')
    .isLength({ min: 5, max: 20 })
    .isAlphanumeric()
    .trim(),
    body('confirmPassword')
    .custom((value, { req }) => {
        console.log('value', value)
        if (value !== req.body.password) {
            throw new Error('Password has to be matched!')
        } else {
            return true;
        }
    })
    .trim()
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

router.post('/findpassword', [
    body('email')
    .isEmail()
    .withMessage('Please enter a valid email.')
    .normalizeEmail()
], authController.postFindPassword)

// router.get('/updatepassword/:token', authController.getFindPassword)

router.post('/updatepassword', [
    body('password', 'Password has to be valid.')
    .isLength({ min: 5, max: 20 })
    .isAlphanumeric()
    .trim(),
    body('confirmPassword')
    .custom((value, { req }) => {
        console.log('value', value)
        if (value !== req.body.password) {
            throw new Error('Password has to be matched!')
        } else {
            return true;
        }
    })
    .trim()
], authController.postUpdatePassword)

module.exports = router;