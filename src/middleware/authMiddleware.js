const jwt = require('jsonwebtoken');

const authMiddleware = (request, response, next) => {
    // Read the token from the cookie
    const token = request.cookies.jwtToken;

    if (!token) {
        return response.status(401).json({ message: 'Authentication required. No token provided.' });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Attach user info to the request object
        request.user = decoded;
        
        next();
    } catch (error) {
        return response.status(403).json({ message: 'Invalid or expired token.' });
    }
};

module.exports = authMiddleware;
