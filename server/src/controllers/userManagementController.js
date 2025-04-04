const { validationResult } = require('express-validator');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Create User
exports.createUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ statusCode: 400, success: false, errors: errors.array() });
  }

  try {
    const { name, email, phone, password } = req.body;
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ statusCode: 400, success: false, message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user = new User({ name, email, phone, password: hashedPassword });
    await user.save();

    res.status(201).json({ statusCode: 201, success: true, message: 'User created successfully', data: user });
  } catch (error) {
    res.status(500).json({ statusCode: 500, success: false, message: 'Server error', error: error.message });
  }
};

// Get All Users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json({ statusCode: 200, success: true, message: 'Users retrieved', data: users });
  } catch (error) {
    res.status(500).json({ statusCode: 500, success: false, message: 'Server error', error: error.message });
  }
};

// Get Single User
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ statusCode: 404, success: false, message: 'User not found' });
    }
    res.status(200).json({ statusCode: 200, success: true, message: 'User retrieved', data: user });
  } catch (error) {
    res.status(500).json({ statusCode: 500, success: false, message: 'Server error', error: error.message });
  }
};

// Update User
exports.updateUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ statusCode: 400, success: false, errors: errors.array() });
  }

  try {
    const { name, email, phone, password } = req.body;
    let user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ statusCode: 404, success: false, message: 'User not found' });
    }

    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.phone = phone || user.phone;

    await user.save();

    res.status(200).json({ statusCode: 200, success: true, message: 'User updated successfully', data: user });
  } catch (error) {
    res.status(500).json({ statusCode: 500, success: false, message: 'Server error', error: error.message });
  }
};

// Delete User
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ statusCode: 404, success: false, message: 'User not found' });
    }
    res.status(200).json({ statusCode: 200, success: true, message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ statusCode: 500, success: false, message: 'Server error', error: error.message });
  }
};
