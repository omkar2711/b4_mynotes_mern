import axios from 'axios';

// Base URL for the notes API (backend server endpoint)
const API_URL = 'https://b4-mynotes-mern.onrender.com/api/notes';
//get
//post
//put
//delete

// Create an axios instance with default configuration
// This instance will be used for all API requests in the app
const api = axios.create({
    baseURL: API_URL, // All requests will be prefixed with this URL
    headers: {
        'Content-Type': 'application/json' // Send data as JSON
    },
    timeout: 5000 // 5 second timeout for requests (prevents hanging)
});

// Function to get all notes from the backend
// Returns an array of note objects
export const getAllNotes = async () => {
    try {
        // Send GET request to / (which is /api/notes/)
        const response = await api.get('/');
        return response.data; // Return the notes data
    } catch (error) {
        // Throw a new error with a message for the UI
        throw new Error(error.message || 'Error fetching notes');
    }
};

// Function to create a new note
// noteData should be an object with title and content
export const createNote = async (noteData) => {
    try {
        // Validate that both title and content are provided
        if (!noteData.title || !noteData.content) {
            throw new Error('Title and content are required');
        }

        // Validate data types
        if (typeof noteData.title !== 'string' || typeof noteData.content !== 'string') {
            throw new Error('Title and content must be strings');
        }

        // Trim whitespace from title and content
        const trimmedData = {
            title: noteData.title.trim(),
            content: noteData.content.trim()
        };

        // Send POST request to create the note
        const response = await api.post('/', trimmedData);
        return response.data; // Return the created note
    } catch (error) {
        throw new Error(error.message || 'Error creating note');
    }
};

// Function to update an existing note by ID
// id: the note's MongoDB ObjectId
// noteData: object with fields to update (title/content)
export const updateNote = async (id, noteData) => {
    try {
        // Validate that the note ID is provided
        if (!id) {
            throw new Error('Note ID is required');
        }

        // Validate that at least one field is provided for update
        if (!noteData.title && !noteData.content) {
            throw new Error('At least one field (title or content) is required for update');
        }

        // Send PUT request to update the note
        const response = await api.put(`/${id}`, noteData);
        return response.data; // Return the updated note
    } catch (error) {
        throw new Error(error.message || 'Error updating note');
    }
};

// Function to delete a note by ID
// id: the note's MongoDB ObjectId
export const deleteNote = async (id) => {
    try {
        // Validate that the note ID is provided
        if (!id) {
            throw new Error('Note ID is required');
        }
        // Send DELETE request to delete the note
        const response = await api.delete(`/${id}`);
        return response.data; // Return the response (usually a success message)
    } catch (error) {
        throw new Error(error.message || 'Error deleting note');
    }
}; 