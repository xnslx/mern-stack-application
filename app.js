const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const app = express();
const mongodb = require('mongodb');
const mongoose = require('mongoose');;
const dbUrl = process.env.URL;

const authRoutes = require('./routes/auth');
const productsRoutes = require('./routes/products');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
})


app.use('/', authRoutes);
app.use('/products', productsRoutes);

app.use((req, res, next) => {
    const error = new Error('Not found!');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})

mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Mongodb successfully connected!')
}).catch(err => {
    console.log(err)
})

app.listen(3001)