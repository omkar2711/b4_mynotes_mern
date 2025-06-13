// Import React and hooks for state and lifecycle management
import React, { useState, useEffect } from 'react';
// Import API functions for fetching and deleting notes
import { getAllNotes, deleteNote } from '../services/api';
// Import the NoteCard component to display individual notes
import NoteCard from './NoteCard';
// Import styles for the notes grid and cards
import '../styles/NoteCard.css';

// Main component to display all notes
const GetallNotes = () => {
    // State to hold the list of notes
    const [notes, setNotes] = useState([]);
    // State to hold user messages (success/error)
    const [message, setMessage] = useState("");
    // State to indicate if data is loading
    const [loading, setLoading] = useState(true);

    // Function to fetch all notes from the backend
    const fetchNotes = async () => {
        try {
            setLoading(true); // Show loading spinner
            // API CALL: Fetch all notes from the backend
            // This sends a GET request to /api/notes and returns the notes array
            const data = await getAllNotes();
            setNotes(data); // Update state with notes
            setMessage(""); // Clear any previous messages
        } catch (error) {
            setMessage("Error fetching notes"); // Show error message
            console.error("Error fetching notes:", error);
        } finally {
            setLoading(false); // Hide loading spinner
        }
    };

    // Function to handle deleting a note
    // Shows a confirmation dialog before deleting
    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this note?")) {
            try {
                // API CALL: Delete the note with the given id
                // This sends a DELETE request to /api/notes/:id
                await deleteNote(id);
                setMessage("Note deleted successfully"); // Show success message
                fetchNotes(); // Refresh the notes list after deletion
            } catch (error) {
                setMessage("Error deleting note"); // Show error message
                console.error("Error deleting note:", error);
            }
        }
    };

    // useEffect to fetch notes when the component mounts
    useEffect(() => {
        // API CALL: Initial fetch of all notes when component loads
        fetchNotes();
    }, []);

    // Render the notes grid, loading state, and messages
    return (
        <div className="notes-container">
            <h1>All Notes</h1>
            {/* Show message if present */}
            {message && <p className="message">{message}</p>}
            {/* Show loading spinner or notes grid */}
            {loading ? (
                <div className="loading">Loading notes...</div>
            ) : notes.length === 0 ? (
                <div className="empty-state">
                    {'No notes yet.'}
                </div>
            ) : (
                <div className="notes-grid">
                    {notes.map((note) => (
                        <NoteCard 
                            key={note._id} 
                            note={note} 
                            onDelete={handleDelete}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

// Export the component for use in the app
export default GetallNotes;
