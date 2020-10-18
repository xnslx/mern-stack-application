const User = require('../models/users');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

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
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }
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
    const errors = validationResult(req);
    const email = req.body.email;
    const password = req.body.password;
    // console.log(errors.errors)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }
    User.findOne({ email: email }).then(user => {
        if (!user) {
            return res.status(401).json('Email not found!')
        } else {
            bcrypt
                .compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        res.json('Log in successfully!')
                    } else {
                        res.json('Password is wrong!')
                    }
                })
        }
    })
}

exports.postLogout = (req, res, next) => {

}