const express = require('express');

const router = express.Router();

const authController = require('../controllers/auth');

router.get('/signup', authController.getSignup)




module.exports = router;