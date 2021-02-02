const Products = require('../models/products');
const User = require('../models/users');
const Order = require('../models/order');
const mongoose = require('mongoose');
const clientId = process.env.CLIENTID;
const clientsecret = process.env.CLIENTSECRET;
const paypal = require('@paypal/checkout-server-sdk');
const { response } = require('express');
const { ObjectID } = require('mongodb');

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
    Products.find(query).then(product => {
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
        res.status(201).json(product)
    }).catch(err => {
        console.log(err)
    })
}

exports.postAddFavorites = (req, res, next) => {
    const prodId = req.body.productId;
    Products.findById(prodId)
        .then(product => {
            return User.findById(mongoose.Types.ObjectId(req.user.userId))
                .then(user => {
                    return user.addToFavoritesList(product)
                })
        })
        .then(result => {
            res.status(200).json({ result: result, message: 'Product is added to the favorite list.' })
        })
        .catch(err => {
            console.log(err)
        })

}

exports.postRemoveFavorites = (req, res, next) => {
    const prodId = req.body.productId;
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
    Products.findById(prodId)
        .then(product => {
            console.log('product', product)
            return User.findById(mongoose.Types.ObjectId(req.user.userId))
                .then(user => {
                    console.log('postaddtoshoppingcart', user)
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
    User.findById(mongoose.Types.ObjectId(req.user.userId))
        .then(user => {
            user.populate('shoppingCart.items.productId')
                .execPopulate()
                .then(result => {
                    console.log('getcheckout', result.shoppingCart.items)
                    const cartItems = result.shoppingCart.items;
                    cartItems.map(i => {
                        total += i.quantity * i.productId.price
                    });
                    return total;
                })
                .then(result => {
                    console.log(result)
                    res.status(200).json({ result: result, message: 'Getting ready for checking out!' })
                })
        })
        .catch(err => {
            console.log(err)
        })
}


exports.postCheckout = (req, res, next) => {
    const firstName = req.body.shippingInfo.firstName;
    const lastName = req.body.shippingInfo.lastName;
    const address = req.body.shippingInfo.address;
    const city = req.body.shippingInfo.city;
    const state = req.body.shippingInfo.state;
    const zipcode = req.body.shippingInfo.zipcode;
    const payment = req.body.paymentInfo;
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
                        },
                        payment: {
                            paymentDetail: req.body.paymentInfo
                        }
                    })
                    return newOrder.save()
                })
                .then(result => {
                    return User.findById(mongoose.Types.ObjectId(req.user.userId)).then(user => {
                        console.log('user', user)
                        return user.clearCart()
                    })
                })
                .then(result => {
                    res.status(200).json({ result: result, message: 'order has been processed!' })
                })
        })
        .catch(err => {
            console.log(err)
        })
}

exports.getCheckoutSuccess = (req, res, next) => {
    Order.find({ 'user.userId': req.params.id })
        .then(order => {
            const purchasedProductsIdList = [];
            const purchasedProducts = order.map(od => {
                return od.products
            })
            const mergedProducts = [].concat.apply([], purchasedProducts);
            mergedProducts.map(pd => {
                return purchasedProductsIdList.push(pd.product._id);
            })
            const needToUpdatedProducts = mergedProducts.map(i => {
                return i.product.stock
            })
            Products.updateMany({ _id: { $in: purchasedProductsIdList } }, { $set: { stock: 0 } }, (err, data) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log(data)
                }
            });
            return order;
        })
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            console.log(err)
        })
}