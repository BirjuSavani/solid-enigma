const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const { updateUserValidation } = require('../validations/userValidation');

const router = express.Router();

router.get('/profile', authMiddleware, userController.getUser);

router.put('/profile', authMiddleware, updateUserValidation, userController.updateUser);

router.delete('/profile', authMiddleware, userController.deleteUser);

module.exports = router;
