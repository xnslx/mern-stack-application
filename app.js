const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const app = express();
const mongodb = require('mongodb');
const mongoose = require('mongoose');

const authRoutes = require('./routes/auth');

const dbUrl = process.env.URL;

// app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json())

app.use('/', authRoutes);
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
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