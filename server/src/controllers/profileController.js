const { validationResult } = require('express-validator');
const User = require('../models/User');

exports.getProfile = async (req, res) => {
  try {
    const userData = await User.findById(req.user._id).select('-password');

    return res.status(200).json({
      statusCode: 200,
      success: true,
      message: 'User retrieved successfully',
      data: userData,
      error: null,
    });
  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      success: false,
      message: 'Internal Server Error',
      data: null,
      error: error.message,
    });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    console.log('User before update:', req.user); // Debugging

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
        data: null,
        error: 'Failed to update user',
      });
    }

    console.log('Updated User:', updatedUser); // Debugging

    return res.status(200).json({
      statusCode: 200,
      success: true,
      message: 'User updated successfully',
      data: updatedUser,
      error: null,
    });
  } catch (error) {
    console.error('Update Error:', error); // Debugging
    return res.status(500).json({
      statusCode: 500,
      success: false,
      message: 'Internal Server Error',
      data: null,
      error: error.message,
    });
  }
};

exports.deleteProfile = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.user.id);

    return res.status(200).json({
      statusCode: 200,
      success: true,
      message: 'User profile deleted successfully',
      data: null,
      error: null,
    });
  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      success: false,
      message: 'Internal Server Error',
      data: null,
      error: error.message,
    });
  }
};
