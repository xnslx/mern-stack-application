const express = require('express');
const router = express.Router();

const productsController = require('../controllers/products');

const Products = require('../models/products');

const isAuth = require('../middleware/is-auth');

router.get('/productslist', productsController.getProductsList);

router.get('/productslist/:id', productsController.getProductsDetail);

router.get('/filteredproducts', productsController.getProductsSearchResult)

router.post('/', productsController.postProductsSearchResult);

router.post('/addfavorites', isAuth.authenticateToken, productsController.postAddFavorites);

router.post('/removefavorites', isAuth.authenticateToken, productsController.postRemoveFavorites)

module.exports = router;