const express = require('express');
const { body } = require('express-validator');
const router = express.Router();

const authController = require('../controllers/auth');

router.get('/signup', authController.getSignup)

router.post('/signup', authController.postSignup)

router.get('/login', authController.getLogin);

router.post('/login', [
    body('email')
    .isEmail()
    .withMessage('Please enter a valid email')
    .normalizeEmail(),
    body('password', 'Password has to be valid.')
    .isLength({ min: 5, max: 20 })
    .isAlphanumeric()
    .trim()

], authController.postLogin);

router.post('/logout', authController.postLogout)


module.exports = router;