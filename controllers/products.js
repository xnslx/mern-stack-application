const Products = require('../models/products');
const User = require('../models/users');
const Order = require('../models/order');
const mongoose = require('mongoose');
const clientId = process.env.CLIENTID;
const clientsecret = process.env.CLIENTSECRET;
const paypal = require('@paypal/checkout-server-sdk');
const { response } = require('express');

exports.getProductsList = (req, res, next) => {
    Products.find()
        .then(products => {
            res.status(201).json(products)
        })
        .catch(err => {
            console.log('err', err)
        })
}

exports.getProductsDetail = (req, res, next) => {
    const prodId = req.params.id;
    Products.find({ _id: prodId })
        .then(product => {
            res.status(201).json(product)
            console.log(product)
        })
        .catch(err => {
            console.log(err)
        })
}


exports.postProductsSearchResult = (req, res, next) => {
    let query = {};
    const productCategory = req.query.category;
    const productSize = req.query.size;
    const productGender = req.query.gender
    let payload = { "category": productCategory, "size": productSize, "gender": productGender }
    if (payload.category && payload.category.length > 0) query.category = { $in: payload.category }
    if (payload.size && payload.size.length > 0) query.size = { $in: payload.size };
    if (payload.gender && payload.gender.length > 0) query.gender = { $in: payload.gender };
    console.log('query', query)
    Products.find(query).then(product => {
        // console.log(product)
        res.status(201).json(product)
    }).catch(err => {
        console.log(err)
    })
}

exports.getProductsSearchResult = (req, res, next) => {
    let query = {};
    const productCategory = req.query.category;
    const productSize = req.query.size;
    const productGender = req.query.gender
    let payload = { "category": productCategory, "size": productSize, "gender": productGender }
    if (payload.category && payload.category.length > 0) query.category = { $in: payload.category }
    if (payload.size && payload.size.length > 0) query.size = { $in: payload.size };
    if (payload.gender && payload.gender.length > 0) query.gender = { $in: payload.gender };
    console.log('query', query)
    Products.find(query).then(product => {
        // console.log(product)
        res.status(201).json(product)
    }).catch(err => {
        console.log(err)
    })
}

exports.postAddFavorites = (req, res, next) => {
    const prodId = req.body.productId;
    console.log('req.user', req.user)
    console.log('prodId', prodId)
    Products.findById(prodId)
        .then(product => {
            console.log('product', product)
            return User.findById(mongoose.Types.ObjectId(req.user.userId))
                .then(user => {
                    return user.addToFavoritesList(product)
                })
        })
        .then(result => {
            console.log('result', result)
            res.status(200).json({ result: result, message: 'Product is added to the favorite list.' })
        })
        .catch(err => {
            console.log(err)
        })

}

exports.postRemoveFavorites = (req, res, next) => {
    const prodId = req.body.productId;
    console.log('postRemoveFavorites', prodId)
    User.findById(mongoose.Types.ObjectId(req.user.userId))
        .then(user => {
            return user.removeProductFromFavList(prodId)
        })
        .then(result => {
            console.log('result', result)
            res.status(200).json('product has been removed from favorite list.')
        })
        .catch(err => {
            console.log(err)
        })
}

exports.getFavoriteList = (req, res, next) => {
    User.findById(mongoose.Types.ObjectId(req.user.userId))
        .then(user => {
            return user.populate('favoriteList.items.productId')
                .execPopulate()
                .then(result => {
                    console.log(result)
                    res.status(200).json(result.favoriteList.items)
                })
                .catch(err => {
                    console.log(err)
                })
        })
}

exports.postAddToShoppingCart = (req, res, next) => {
    const prodId = req.body.productId;
    console.log('req.user', req.user)
    console.log('prodId', prodId)
    Products.findById(prodId)
        .then(product => {
            console.log('product', product)
            return User.findById(mongoose.Types.ObjectId(req.user.userId))
                .then(user => {
                    return user.addToShoppingCart(product)
                })
        })
        .then(result => {
            console.log('result', result)
            res.status(200).json({ result: result, message: 'Product is added to the shopping cart.' })
        })
        .catch(err => {
            console.log(err)
        })
}

exports.postRemoveFromShoppingCart = (req, res, next) => {
    const prodId = req.body.productId;
    console.log('postRemoveFromShoppingCart', prodId)
    User.findById(mongoose.Types.ObjectId(req.user.userId))
        .then(user => {
            return user.removeProductFromShoppingCart(prodId)
        })
        .then(result => {
            console.log('result', result)
            res.status(200).json('product has been removed from shopping cart.')
        })
        .catch(err => {
            console.log(err)
        })
}

exports.getShoppingCart = (req, res, next) => {
    User.findById(mongoose.Types.ObjectId(req.user.userId))
        .then(user => {
            return user.populate('shoppingCart.items.productId')
                .execPopulate()
                .then(result => {
                    console.log('getshoppingcart', result)
                    res.status(200).json(result.shoppingCart.items)
                })
                .catch(err => {
                    console.log(err)
                })
        })
}

exports.getCheckout = (req, res, next) => {
    let total = 0;
    let environment = new paypal.core.SandboxEnvironment(clientId, clientsecret);
    let client = new paypal.core.PayPalHttpClient(environment);
    let request = new paypal.orders.OrdersCreateRequest()
    User.findById(mongoose.Types.ObjectId(req.user.userId))
        .then(user => {
            user.populate('shoppingCart.items.productId')
                .execPopulate()
                .then(result => {
                    const cartItems = result.shoppingCart.items;
                    total = 0;
                    cartItems.map(i => {
                        total += i.quantity * i.productId.price
                    });
                    // console.log('total', total)
                    return request.requestBody({
                        "intent": "CAPTURE",
                        "application_context": {
                            "return_url": "http://localhost:3001/products/checkout/success",
                            "cancel_url": "http://localhost:3001/products/checkout/fail"
                        },
                        "purchase_units": [{
                            "amount": {
                                "currency_code": "USD",
                                "value": total
                            }
                        }]
                    })
                })
                .then(result => {
                    console.log('getcheckout', result)
                    let createOrder = async function() {
                        let response = await client.execute(request);
                        console.log('response', response.result.links);
                    }
                    createOrder()
                })
        })
        .catch(err => {
            console.log(err)
        })
}


exports.postCheckout = (req, res, next) => {
    console.log(req.user)
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const address = req.body.address;
    const city = req.body.city;
    const state = req.body.state;
    const zipcode = req.body.zipcode;
    User.findById(mongoose.Types.ObjectId(req.user.userId))
        .then(user => {
            user.populate('shoppingCart.items.productId')
                .execPopulate()
                .then(result => {
                    const cartItems = result.shoppingCart.items.map(i => {
                            return {
                                product: i.productId._doc,
                                quantity: i.quantity
                            }
                        })
                        // console.log('cartItems', cartItems)
                    const newOrder = new Order({
                        products: cartItems,
                        user: {
                            email: req.user.email,
                            userId: req.user.userId
                        },
                        shippingInfo: {
                            firstName: firstName,
                            lastName: lastName,
                            address: address,
                            city: city,
                            state: state,
                            zipcode: zipcode
                        }
                    })
                    console.log('newOrder', newOrder)
                    return newOrder.save()
                })
                .then(result => {
                    console.log(result)
                    res.status(200).json({ result: result, message: 'order has been processed!' })
                })
        })
        .catch(err => {
            console.log(err)
        })
}

exports.getCheckoutSuccess = (req, res, next) => {
    Order.find({ 'user.userId': mongoose.Types.ObjectId(req.user.userId) })
        .then(order => {
            console.log(order)
            res.status(200).json({ order: order, message: 'Here is your order detail!' })
        })
        .catch(err => {
            console.log(err)
        })
}