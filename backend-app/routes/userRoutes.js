const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware'); // Assuming you have a middleware for authentication

const router = express.Router();

// @route    GET /api/user
// @desc     Get user info
// @access   Private
router.get('/', authMiddleware, userController.getUser);

module.exports = router;
