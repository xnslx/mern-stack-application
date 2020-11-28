const express = require('express');
const router = express.Router();

const productsController = require('../controllers/products');

const Products = require('../models/products');

router.get('/productslist', productsController.getProductsList);

router.get('/productslist/:id', productsController.getProductsDetail);

router.post('/', productsController.postProductsSearchResult);

module.exports = router;