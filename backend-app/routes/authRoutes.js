const express = require('express');
const { check } = require('express-validator');
const authController = require('../controllers/authController');

const router = express.Router();

// @route    POST /api/auth/register
// @desc     Register a user
// @access   Public
router.post(
  '/register',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('name', 'Name must only contain letters').isAlpha(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password must be at least 8 characters').isLength({ min: 8 }),
    check('password', 'Password must contain at least one letter, one number, and one special character').matches(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/),
  ],
  authController.registerUser
);

// @route    POST /api/auth/login
// @desc     Login a user
// @access   Public
router.post(
  '/login',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  authController.loginUser
);

module.exports = router;
