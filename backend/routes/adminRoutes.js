const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

// Tylko administrator ma dostęp
router.post('/users', authMiddleware, roleMiddleware('admin'), adminController.createUser);
router.get('/users', authMiddleware, roleMiddleware('admin'), adminController.getUsers);

module.exports = router;
