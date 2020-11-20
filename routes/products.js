const express = require('express');
const router = express.Router;

const productsController = require('../controllers/products');

const Products = require('../models/products');

router.get('/products/productslist', productsController.getProductsList);

module.exports = router;