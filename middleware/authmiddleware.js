const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    
    const authtoken = req.headers.authorization;

    const tokenParts = authtoken.split(' ');
    const token = tokenParts[1];
    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }

    // Verify token
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
        if (err) {
            return res.status(401).json({ message: "Invalid token" });
        }

        // Attach the decoded token payload to the request object
        req.user = decodedToken;
        next(); // Proceed to the next middleware
    });
};

module.exports = { verifyToken };
