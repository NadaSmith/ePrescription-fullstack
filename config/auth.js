//contains JWT token generation, middleware, and user registration logic

const jwt = require('jsonwebtoken');

// Your secret key (consider using environment variables)
const secretKey = 'your-secret-key'; //replace with a secure key

// User registration logic
const signup = async (req, res) => {
    try {
      const { username, password } = req.body;
  
      // Check if the user already exists (you may want to implement this logic)
      // If the user already exists, return an error response
  
      // Create a new user record in your database (e.g., MongoDB with Mongoose)
      // Replace 'User' with your actual User model
      const newUser = new User({ username, password });
  
      // Save the user to the database (use async/await or promises)
      await newUser.save();
  
      // Generate a JWT token
      const token = jwt.sign({ userId: newUser._id }, secretKey, {
        expiresIn: '1h', // Token expires in 1 hour (adjust as needed)
      });
  
      res.status(201).json({ token });
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
};

// config/auth.js (continued)

// User login logic
const login = async (req, res) => {
    try {
      const { username, password } = req.body;
  
      // Authenticate the user (compare credentials with the database)
      // If authentication fails, return an error response
  
      // If authentication is successful, generate a JWT token
      const token = jwt.sign({ userId: user._id }, secretKey, {
        expiresIn: '1h', // Token expires in 1 hour (adjust as needed)
      });
  
      res.status(200).json({ token });
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
};


// User authentication middleware (protects routes)
const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
      return res.status(401).json({ message: 'Authorization token is required' });
    }
  
    try {
      const decoded = jwt.verify(token, secretKey);
      req.userId = decoded.userId;
      next();
    } catch (error) {
      res.status(401).json({ message: 'Invalid token' });
    }
};

// Function to generate a JWT token
const generateToken = (userId) => {
  const token = jwt.sign({ userId }, secretKey, {
    expiresIn: '1h', // Token expires in 1 hour (adjust as needed)
  });
  return token;
};

module.exports = {
  authMiddleware,
  generateToken,
  signup,
  login,
};
