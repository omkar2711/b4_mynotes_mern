import React, { useState } from 'react';
import { createNote } from '../services/api';

const AddNote = ({ onNoteAdded }) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        // Validate inputs
        if (!title.trim() || !content.trim()) {
            setMessage("Title and content are required");
            setLoading(false);
            return;
        }

        try {
            console.log('Sending note data:', { title, content });
            const noteData = {
                title: title.trim(),
                content: content.trim()
            };
            const response = await createNote(noteData);
            console.log('Note created successfully:', response);
            setMessage("Note added successfully!");
            // Clear the form
            setTitle("");
            setContent("");
            // Notify parent component to refresh notes
            if (onNoteAdded) {
                onNoteAdded();
            }
        } catch (error) {
            console.error('Error in handleSubmit:', error);
            setMessage(error.message || "Error adding note. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="add-note-container">
            <h2>Add Note</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        disabled={loading}
                        minLength={1}
                    />
                </div>
                <div className="form-group">
                    <textarea
                        placeholder="Content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                        disabled={loading}
                        minLength={1}
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? "Adding..." : "Add Note"}
                </button>
            </form>
            {message && (
                <p className={`message ${message.includes('successfully') ? 'success' : 'error'}`}>
                    {message}
                </p>
            )}
        </div>
    );
};

export default AddNote;
