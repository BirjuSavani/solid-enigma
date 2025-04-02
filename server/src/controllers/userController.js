const { validationResult } = require('express-validator');
const User = require('../models/User');

exports.getUser = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(404).json({
        statusCode: 404,
        success: false,
        message: 'User not found',
      });
    }

    return res.status(200).json({
      statusCode: 200,
      success: true,
      message: 'User retrieved successfully',
      data: req.user, // `req.user` is set in authMiddleware
    });
  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      success: false,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    console.log('User before update:', req.user); // Debugging

    if (!req.user) {
      return res.status(404).json({
        statusCode: 404,
        success: false,
        message: 'User not found',
      });
    }

    const { name, email, phone } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id, // Ensure `req.user._id` is correctly set
      { name, email, phone },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        statusCode: 404,
        success: false,
        message: 'Failed to update user',
      });
    }

    console.log('Updated User:', updatedUser); // Debugging

    return res.status(200).json({
      statusCode: 200,
      success: true,
      message: 'User updated successfully',
      data: updatedUser,
    });
  } catch (error) {
    console.error('Update Error:', error); // Debugging
    return res.status(500).json({
      statusCode: 500,
      success: false,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.user.id);
    if (!user) {
      return res.status(404).json({
        statusCode: 404,
        success: false,
        message: 'User not found',
      });
    }

    return res.status(200).json({
      statusCode: 200,
      success: true,
      message: 'User profile deleted successfully',
    });
  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      success: false,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};
