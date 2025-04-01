const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware'); // ✅ Protect route

const router = express.Router();

// ✅ Get User Profile (Protected)
router.get('/profile', authMiddleware, userController.getUser);

module.exports = router;
