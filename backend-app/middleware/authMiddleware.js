const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      statusCode: 401,
      success: false,
      message: 'Unauthorized access',
      error: 'Token is missing',
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); 
    req.user = await User.findById(decoded.userId).select('-password');
    
    if (!req.user) {
      return res.status(404).json({
        statusCode: 404,
        success: false,
        message: 'User not found',
      });
    }
    next();
  } catch (error) {
    return res.status(401).json({
      statusCode: 401,
      success: false,
      message: 'Unauthorized access',
      error: 'Invalid or expired token',
    });
  }
};

module.exports = authMiddleware;
