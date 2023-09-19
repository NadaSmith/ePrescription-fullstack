const express = require('express');
const router = express.Router();


// Import necessary functions from auth.js
const authMiddleware = require('../config/auth');

//import controller
const userController = require('../controllers/userController');

// Define routes for user operations

//signup
router.post('/signup', userController.registerUser);

//login
router.post('/login', userController.loginUser);

//fectching user profile (get, protected)
router.get('/profile', userController.getProfile);

//updating user profile (put, protected)
router.put('/profile', userController.updateUserProfile);

module.exports = router;
