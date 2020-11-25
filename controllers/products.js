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

exports.getProductsCategory = (req, res, next) => {
    const productCategory = req.query.category;
    const productSize = req.query.size;
    const productGender = req.query.gender
    console.log('req.query', req.query)
    console.log('req.params', req.params)
    Products.find({ $or: [{ category: productCategory }, { size: productSize }, { gender: productGender }] })
        .then(product => {
            console.log('product', product)
            res.status(201).json(product)
        })
        .catch(err => {
            console.log(err)
        })
}

// exports.getProductsCategory = (req, res, next) => {
//     console.log('req.query', req.query)
//     let query = {};
//     const productCategory = req.query.category;
//     const productSize = req.query.size;
//     const productGender = req.query.gender
//     let payload = { 'gender': productGender, 'size': productSize, 'category': productCategory };
//     if (payload.gender && payload.gender.length > 0) query.gender = payload.gender
//     if (payload.size && payload.gender.size > 0) query.size = payload.size
//     if (payload.category && payload.category.length > 0) query.category = payload.category
//     console.log('query', query)
//     Products.find({ gender: query.gender, size: query.size, category: query.category }).then(product => {
//         // console.log(product)
//         res.status(201).json(product)
//     }).catch(err => {
//         console.log(err)
//     })
// }