const express = require('express');

const router = express.Router();

const authController = require('../controllers/auth');

router.get('/', authController.getSignup)

router.post('/add', authController.postSignup)


module.exports = router;