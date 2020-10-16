const User = require('../models/users');

exports.getSignup = (req, res, next) => {
    res.send('hello world!')
}

exports.postSignup = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    const newUser = new User({
        email: email,
        password: password
    })
    newUser.save().then(result => {
        res.send('you successfully sign up!')
    }).catch(err => {
        console.log(err)
    })
}