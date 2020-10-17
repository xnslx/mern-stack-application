const User = require('../models/users');
const bcrypt = require('bcrypt');

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
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    User
        .findOne({ email: email })
        .then(user => {
            if (user) {
                return res.status(400).json('email already exists!')
            } else {
                bcrypt
                    .hash(password, 10)
                    .then(hashedPassword => {
                        const newUser = new User({
                            name: name,
                            email: email,
                            password: hashedPassword
                        })
                        return newUser.save()
                    })
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
            bcrypt
                .compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        res.json('log in successfully!')
                    } else {
                        res.json('password is wrong!')
                    }
                })
        }
    })
}

exports.postLogout = (req, res, next) => {

}