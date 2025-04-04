const { check } = require('express-validator');

exports.registerValidation = [
  check('name', 'Name is required').not().isEmpty(),
  check('name', 'Name must only contain letters and spaces').matches(/^[A-Za-z ]+$/),
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password must be at least 8 characters').isLength({ min: 8 }),
  check('password', 'Password must contain at least one letter, one number, and one special character').matches(
    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
  ),
  check('phone', 'Phone number is required').not().isEmpty(),
  check('phone', 'Phone number must be a valid 10-digit number').matches(/^\d{10}$/),
];

exports.loginValidation = [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists(),
];
