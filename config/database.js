const mongoose = require('mongoose');

console.log('MONGO_URI:', process.env.MONGO_URI);
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true, // Add this line
    useFindAndModify: false // Add this line
});

const db = mongoose.connection

db.on("connected", function() {
    console.log(`Connected to ${db.host}:${db.port}`)
});

// Handle database connection errors
db.on("error", function(err) {
    console.error("MongoDB connection error:", err);
});

// Handle database disconnections
db.on("disconnected", function() {
    console.log("MongoDB disconnected");
});

//contains database configuration