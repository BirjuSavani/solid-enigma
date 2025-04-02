const express = require('express');
const { registerValidation, loginValidation } = require('../validations/authValidation');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/register', registerValidation, authController.registerUser);
router.post('/login', loginValidation, authController.loginUser);

module.exports = router;
