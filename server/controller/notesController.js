// Import the Note model for interacting with the notes collection in MongoDB
const Note = require('../model/Note');

// Controller to get all notes from the database
// Handles GET /api/notes/
const get_all_notes = async (req, res) => {
    try {
        // Find all notes, sorted by creation date (newest first)
        const notes = await Note.find().sort({ createdAt: -1 });
        // Send the notes as a JSON response
        res.status(200).json(notes);
    } catch (error) {
        // Log and send error if fetching fails
        console.error('Error fetching notes:', error);
        res.status(500).json({ message: 'Error fetching notes', error: error.message });
    }
}

// Controller to add a new note to the database
// Handles POST /api/notes/
const add_note = async (req, res) => {
    // Log the incoming request for debugging
    console.log('Received request body:', req.body);
    console.log('Request headers:', req.headers);
    
    try {
        // Validate request body: both title and content are required
        if (!req.body.title || !req.body.content) {
            console.log('Validation failed:', { 
                title: req.body.title, 
                content: req.body.content 
            });
            return res.status(400).json({ 
                message: 'Title and content are required',
                received: req.body 
            });
        }

        // Create a new Note instance
        const note = new Note({
            title: req.body.title,
            content: req.body.content
        });

        // Save the note to the database
        console.log('Attempting to save note:', note);
        const newNote = await note.save();
        console.log('Note created successfully:', newNote);
        // Respond with the created note
        res.status(201).json(newNote);
    } catch (error) {
        // Log and send error if creation fails
        console.error('Error creating note:', error);
        console.error('Error stack:', error.stack);
        res.status(400).json({ 
            message: 'Error creating note', 
            error: error.message,
            received: req.body
        });
    }
}

// Controller to update an existing note by its ID
// Handles PUT /api/notes/:id
const update_note = async (req, res) => {
    try {
        // Validate that the note ID is provided
        if (!req.params.id) {
            return res.status(400).json({ message: 'Note ID is required' });
        }

        // Validate that at least one field is provided for update
        if (!req.body.title && !req.body.content) {
            return res.status(400).json({ message: 'At least one field (title or content) is required for update' });
        }

        // Find the note by ID and update the provided fields
        const note = await Note.findByIdAndUpdate(
            req.params.id,
            {
                ...(req.body.title && { title: req.body.title }), // Only update if provided
                ...(req.body.content && { content: req.body.content }),
                updatedAt: Date.now() // Update the timestamp
            },
            { new: true, runValidators: true } // Return the updated note, run schema validators
        );

        if (note) {
            // Respond with the updated note
            res.status(200).json(note);
        } else {
            // If note not found, send 404
            res.status(404).json({ message: 'Note not found' });
        }
    } catch (error) {
        // Log and send error if update fails
        console.error('Error updating note:', error);
        res.status(400).json({ message: 'Error updating note', error: error.message });
    }
}

// Controller to delete a note by its ID
// Handles DELETE /api/notes/:id
const delete_note = async (req, res) => {
    try {
        // Validate that the note ID is provided
        if (!req.params.id) {
            return res.status(400).json({ message: 'Note ID is required' });
        }

        // Find the note by ID and delete it
        const note = await Note.findByIdAndDelete(req.params.id);
        if (note) {
            // Respond with success message if deleted
            res.status(200).json({ message: "Note deleted successfully" });
        } else {
            // If note not found, send 404
            res.status(404).json({ message: "Note not found" });
        }
    } catch (error) {
        // Log and send error if deletion fails
        console.error('Error deleting note:', error);
        res.status(400).json({ message: 'Error deleting note', error: error.message });
    }
}

// Export all controller functions for use in routes
module.exports = {
    get_all_notes,
    add_note,
    update_note,
    delete_note
}