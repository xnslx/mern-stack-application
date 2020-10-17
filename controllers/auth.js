const User = require('../models/users');

exports.getSignup = (req, res, next) => {
    // res.send('hello world!')
    console.log('req.body', req.body)
    User
        .find()
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            console.log(err)
        })
}

exports.postSignup = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    const newUser = new User({
        email: email,
        password: password
    })
    newUser.save().then(() => {
        res.status(201).json('you successfully sign up!')
    }).catch(err => {
        console.log(err)
    })
}