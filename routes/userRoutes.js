const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Define routes for user operations
router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.get('/profile', userController.getProfile);
router.put('/profile', userController.updateProfile);

module.exports = router;
