const Products = require('../models/products');

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