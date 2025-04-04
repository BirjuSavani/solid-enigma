const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        statusCode: 401,
        success: false,
        message: 'Unauthorized access',
        data: null,
        error: 'Invalid token format. Use "Bearer <token>"',
      });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.userId).select('-password');

    if (!user) {
      return res.status(404).json({
        statusCode: 404,
        success: false,
        message: 'User not found',
        data: null,
        error: 'User not found',
      });
    }

    req.user = user;
    next(); // Proceed to the next middleware or controller
  } catch (error) {
    let errorMessage = 'Invalid or expired token';
    let statusCode = 401;

    if (error.name === 'TokenExpiredError') {
      errorMessage = 'Token has expired. Please log in again.';
      statusCode = 403;
    }

    return res.status(statusCode).json({
      statusCode,
      success: false,
      message: 'Unauthorized access',
      error: errorMessage,
    });
  }
};

module.exports = authMiddleware;
