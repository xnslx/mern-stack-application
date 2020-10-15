const express = require('express');
const bodyParser = require('body-parser');
const app = express();
require('dotenv').config();
const mongodb = require('mongodb');
const mongoose = require('mongoose');

const dbUrl = process.env.URL;

app.use(bodyParser.urlencoded({ extended: false }));


// const port = process.env.PORT || 5000;

mongoose.connect(dbUrl, {
    useNewUrlParser: true
}).then(() => {
    console.log('Mongodb successfully connected!')
}).catch(err => {
    console.log(err)
})

app.listen(3000)