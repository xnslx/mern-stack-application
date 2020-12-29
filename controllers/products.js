const Products = require('../models/products');
const User = require('../models/users');
const Order = require('../models/order');
const mongoose = require('mongoose')

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
                    console.log(result)
                    res.status(200).json(result.shoppingCart.items)
                })
                .catch(err => {
                    console.log(err)
                })
        })
}

exports.postOrder = (req, res, next) => {
    User.findById(mongoose.Types.ObjectId(req.user.userId))
        .then(user => {
            console.log('postorder', user)
            const newOrder = new Order({ orderItems: user.shoppingCart.items });
            console.log(newOrder)
        })
        .catch(err => {
            console.log(err)
        })
}