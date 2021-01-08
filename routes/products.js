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

router.get('/favoritelist', isAuth.authenticateToken, productsController.getFavoriteList)



router.post('/addtoshoppingcart', isAuth.authenticateToken, productsController.postAddToShoppingCart)

router.post('/removefromshoppingcart', isAuth.authenticateToken, productsController.postRemoveFromShoppingCart)

router.get('/shoppingcart', isAuth.authenticateToken, productsController.getShoppingCart)


router.get('/checkout', isAuth.authenticateToken, productsController.getCheckout)
router.post('/checkout', isAuth.authenticateToken, productsController.postCheckout)

router.get('/order/:id', isAuth.authenticateToken, productsController.getCheckoutSuccess)

module.exports = router;