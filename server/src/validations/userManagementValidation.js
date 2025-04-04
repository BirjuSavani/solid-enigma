const { check } = require('express-validator');

exports.userManagementValidationRules = [
  check('name', 'Name is required').not().isEmpty(),
  check('name', 'Name should only contain letters and spaces').matches(/^[A-Za-z\s]+$/),
  check('email', 'Please enter a valid email').isEmail(),
  check('phone', 'Phone number must be a valid 10-digit number').isLength({ min: 10, max: 10 }).isNumeric(),
  check('password', 'Password must be at least 8 characters').isLength({ min: 8 }),
  check('password', 'Password must contain at least one letter, one number, and one special character').matches(
    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
  ),
];
