const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

function createJWT(user) {
    return jwt.sign(
        { user },
        process.env.SECRET,
        { expiresIn: '24h' }  
    );
}

// Register a new user
exports.registerUser = async (req, res) => {
  try {
        // Extract user data from the request body
        const { username, email, password } = req.body;

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password before storing it
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user using the User model
        const newUser = new User({ username, email, password: hashedPassword });

        // Save the new user to the database
        await newUser.save();

        // Create a JWT token for the newly registered user
        const token = createJWT(newUser);

        // Return the user data and token
        res.status(201).json({ user: newUser, token });
    } catch (error) {
        // Handle registration errors
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

// User login
exports.loginUser = async (req, res) => {
  try {
        // Extract user credentials from the request body
        const { username, password } = req.body;

        // Find the user by their username
        const user = await User.findOne({ username });

        // If the user doesn't exist, return an error
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Compare the provided password with the stored hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        // If the password is not valid, return an error
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        // Create a JWT token for the logged-in user
        const token = jwt.sign({ userId: user._id }, process.env.SECRET, {
            expiresIn: "24h",
        });

        // Return the user data and token
        res.status(200).json({ user, token });
    } catch (error) {
        // Handle login errors
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

// Fetch User Profile
exports.getProfile = async (req, res) => {
    try {
      // Retrieve the user's ID from the request object
      const userId = req.userId; // Assuming you store user ID in the request object
  
      // Fetch the user's profile from the database based on the user's ID
      const user = await User.findById(userId);
  
      // Check if the user exists
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Return the user's profile
      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  };

// Update user profile
exports.updateUserProfile = async (req, res) => {
  try {
        // Extract updated user data from the request body
        const { username, email, password } = req.body;

        // Find the user by their ID
        const userId = req.params.userId;
        const user = await User.findById(userId);

        // If the user doesn't exist, return an error
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update user data based on req.body
        if (username) user.username = username;
        if (email) user.email = email;
        if (password) {
            // Hash and store the updated password securely
            user.password = await bcrypt.hash(password, 10);
        }

        // Save the updated user data
        await user.save();

        // Return the updated user data
        res.status(200).json(user);
    } catch (error) {
        // Handle update errors
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

