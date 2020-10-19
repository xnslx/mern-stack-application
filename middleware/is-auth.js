const jwt = require('jsonwebtoken');

exports.authenticationToken = (req, res, next) => {
    const authHeader = req.get('authorization');
    console.log('authHeader', authHeader);
    if (!authHeader) {
        const error = new Error('Not authenticated');
        error.statusCode = 401;
        throw error;
    }
    const token = authHeader.split(' ')[1];
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    } catch (err) {
        err.statusCode = 500;
        throw error
    }
    if (!decodedToken) {
        const error = new Error('Not authenticated')
        error.statusCode = 401;
        throw error;
    }
    req.userId = decodedToken.userId;
    next();
}