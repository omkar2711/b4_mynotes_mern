// Import the Express framework to create a router
const express = require('express')
// Create a new router instance for defining route handlers
const router = express.Router();
// Import controller functions for handling note operations
const { get_all_notes, add_note, update_note, delete_note } = require('../controller/notesController.js')

// Handle OPTIONS requests for CORS preflight (important for cross-origin requests)
router.options('*', (req, res) => {
    res.status(204).end(); // Respond with 204 No Content
});

// Route to get all notes (GET /api/notes/)
router.get('/', get_all_notes);

// Route to create a new note (POST /api/notes/)
router.post('/', add_note);

// Route to update a note by its MongoDB ObjectId (PUT /api/notes/:id)
// The regex ensures only valid 24-character hex ObjectIds are accepted
router.put('/:id([0-9a-fA-F]{24})', update_note);

// Route to delete a note by its MongoDB ObjectId (DELETE /api/notes/:id)
router.delete('/:id([0-9a-fA-F]{24})', delete_note);

// Error handling middleware for this router
// Catches errors from the above routes and sends a generic error response
router.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

// Export the router to be used in server.js
module.exports = router;
