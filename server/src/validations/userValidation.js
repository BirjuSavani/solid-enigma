const { check } = require('express-validator');

exports.updateUserValidation = [
  check('name', 'Name must only contain letters and spaces')
    .optional()
    .matches(/^[A-Za-z ]+$/),

  check('email', 'Please include a valid email').optional().isEmail(),

  check('phone', 'Phone number must be a valid 10-digit number')
    .optional()
    .matches(/^\d{10}$/),
];
