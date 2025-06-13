// Import the Express framework for building the web server
const express = require('express')
// Import the routes for handling notes-related API endpoints
const routes = require('./routes/routes.js')
// Create an Express application instance
const app = express()
// Import CORS middleware to handle cross-origin requests
const cors = require('cors')
// Set the port for the server (from environment variable or default to 5001)
const port = process.env.PORT || 5001
// Import Mongoose for MongoDB object modeling
const mongoose = require('mongoose');
// Load environment variables from a .env file into process.env
require('dotenv').config();

// CORS (Cross-Origin Resource Sharing) configuration
// This allows the frontend (possibly running on a different port) to access the backend APIs
const corsOptions = {
    origin: '*', // Allow all origins (for development; restrict in production)
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
    credentials: true, // Allow cookies and credentials (not needed if using '*')
    preflightContinue: false, // Do not pass the CORS preflight response to the next handler
    optionsSuccessStatus: 204 // Status for successful OPTIONS requests
};

// Apply CORS middleware globally to all routes
app.use(cors(corsOptions));

// Middleware to parse incoming JSON requests
app.use(express.json());

// Connect to MongoDB using Mongoose
// Uses the MONGODB_URI from environment variables, or defaults to local MongoDB
mongoose.connect("mongodb+srv://omkarbharitkar79:YqFF5symnHOMlt6o@cluster0.jkdimbw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(() => {
    // Log success if connected
    console.log("Connected to MongoDB");
})
.catch((err) => {
    // Log error and exit if connection fails
    console.error("MongoDB connection error:", err);
    process.exit(1);
});

// Error handling middleware
// Catches errors from all routes and sends a generic error response
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

// Mount the notes API routes under /api/notes
app.use('/api/notes', routes);

// Basic route for testing if the server is running
app.get('/', (req, res) => {
    res.json({ message: 'Notes API is running' });
});

// Handle preflight OPTIONS requests for all routes (for CORS)
app.options('*', cors(corsOptions));

// Start the server and listen on the specified port
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
