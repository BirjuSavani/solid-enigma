const express = require('express');
const { registerValidation, loginValidation } = require('../validations/authValidation');
const authController = require('../controllers/authController'); // ✅ Correct import

const router = express.Router();

// ✅ Ensure `authController.registerUser` and `authController.loginUser` exist
router.post('/register', registerValidation, authController.registerUser);
router.post('/login', loginValidation, authController.loginUser);

module.exports = router;
