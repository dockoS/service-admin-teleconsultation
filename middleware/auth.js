const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const adminId = decodedToken.adminId;
        if (req.body.adminId && req.body.adminId !== adminId) {
            throw 'Invalid user ID';
        } else {
            next();
        }
    } catch(Exception) {
        res.status(401).json({
            message: 'Invalid request!'
        });
    }
};