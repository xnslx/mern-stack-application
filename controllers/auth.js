require('dotenv').config();
const User = require('../models/users');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

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
    const confirmPassword = req.body.confirmPassword;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }
    bcrypt
        .hash(password, 10)
        .then(hashedPassword => {
            const newUser = new User({
                name: name,
                email: email,
                password: hashedPassword
            })
            return newUser.save();
        })
        .then(result => {
            console.log('result', result)
            res.status(201).json({ message: 'you successfully sign up!', userId: result._id });
        })
        .catch(err => {
            console.log(err)
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
    let loadedUser;
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }
    User.findOne({ email: email }).then(user => {
        if (!user) {
            return res.status(401).json('Email not found!')
        }
        loadedUser = user;
        bcrypt
            .compare(password, user.password)
            .then(isMatch => {
                if (!isMatch) {
                    res.json('Password is wrong!')
                } else {
                    const user = {
                        email: loadedUser.email,
                        userId: loadedUser._id.toString(),
                        userName: loadedUser.name
                    }
                    const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' })
                    res.json({ token: token, userId: user.userId, userName: user.userName })
                }
            })
    })
}

exports.postLogout = (req, res, next) => {

}

exports.postFindPassword = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }
    const email = req.body.email
    User.findOne({ email: email }).then(user => {
        if (!user) {
            return res.status(401).json('Email not found!')
        }
        const token = crypto.randomBytes(32).toString('hex');
        user.resetToken = token;
        user.resetTokenExpiration = Date.now() + 3600000;
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        })
        let mailOptions = {
            from: 'MySonAndMyDaughterShop@gmail.com',
            to: req.body.email,
            subject: 'Reset Password',
            html: `
                <p>Click this <a href="http://localhost:3001/findpassword/{token}">link</a> to set a new password. </p>
            `
        }
        transporter.sendMail(mailOptions, (err, data) => {
            if (err) {
                return console.log('error occurs', err)
            }
            return res.status(201).json('Email sent!')
        })
    })
}