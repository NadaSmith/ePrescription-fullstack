const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../config/auth').authMiddleware;

// Define routes for user operations
router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.get('/profile', userController.getProfile);
router.put('/profile', userController.updateProfile);

router.get('/profile', authMiddleware, (req, res) => {
    // This route is protected; only authenticated users can access it
    res.status(200).json({ message: 'Protected route accessed' });
});

module.exports = router;
