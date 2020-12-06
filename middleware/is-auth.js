const jwt = require('jsonwebtoken');

exports.authenticateToken = (req, res, next) => {
    const token = req.header('Authorization');
    console.log('token', token);
    if (!token) {
        return res.status(401).json({ message: 'Authorization denied!' })
    }
    // const token = authHeader.split(' ')[1];
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        req.user = decodedToken;
        next();
    } catch (err) {
        res.status(400).json({ message: 'Token is not valid!' })
    }
}