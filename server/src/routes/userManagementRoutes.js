const express = require('express');
const { userManagementValidationRules } = require('../validations/userManagementValidation');
const {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require('../controllers/userManagementController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/create', userManagementValidationRules, createUser);
router.get('/list', authMiddleware, getUsers);
router.get('/:id', authMiddleware, getUserById);
router.put('/:id', authMiddleware, userManagementValidationRules, updateUser);
router.delete('/:id', authMiddleware, deleteUser);

module.exports = router;
