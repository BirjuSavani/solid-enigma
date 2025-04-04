const express = require('express');
const userController = require('../controllers/profileController');
const authMiddleware = require('../middleware/authMiddleware');
const { updateUserValidation } = require('../validations/userValidation');

const router = express.Router();

router.get('/profile', authMiddleware, userController.getProfile);

router.put('/profile', authMiddleware, updateUserValidation, userController.updateProfile);

router.delete('/profile', authMiddleware, userController.deleteProfile);

module.exports = router;
