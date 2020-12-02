const express = require('express');
const router = express.Router();

const productsController = require('../controllers/products');

const Products = require('../models/products');

router.get('/productslist', productsController.getProductsList);

router.get('/productslist/:id', productsController.getProductsDetail);

router.get('/filteredproducts', productsController.getProductsSearchResult)

router.post('/', productsController.postProductsSearchResult);

module.exports = router;