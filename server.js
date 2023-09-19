require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const path = require('path');
const authMiddleware  = require('./config/auth').authMiddleware;

require("./config/database");


const port = process.env.PORT || 3001;

app.use(express.static(path.join(__dirname, 'build')));

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(authMiddleware);

//MongoDB connection setup
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true, // Add this line
  useFindAndModify: false // Add this line
});

// Define your routes here (authentication, CRUD operations, etc.)
app.use('/', require('./routes/medicationRoute'));

app.use('/', require('./routes/patientRoute'));

app.use('/', require('./routes/userRoutes'));

//static catch-all app; always goes last bc want to test everything else first
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
})

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
