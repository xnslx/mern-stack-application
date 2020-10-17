const User = require('../models/users');

exports.getSignup = (req, res, next) => {
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
    User.findOne({ email: email }).then(user => {
        if (user) {
            return res.status(400).json('email already exists!')
        } else {
            const newUser = new User({
                email: email,
                password: password
            })
            newUser
                .save()
                .then(() => {
                    res.status(201).json('you successfully sign up!')
                })
                .catch(err => {
                    console.log(err)
                })
        }
    })
}

exports.getLogin = (req, res, next) => {
    res.status(200).json('Log in successfully!')
}

exports.postLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({ email: email }).then(user => {
        if (!user) {
            return res.status(404).json('Email not found!')
        } else {
            res.json('log in successfully!')
        }
    })
}

exports.postLogout = (req, res, next) => {

}