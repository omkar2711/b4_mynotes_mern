import React, { useState } from 'react';
import { updateNote } from '../services/api';

const UpdateNotes = ({ onNoteUpdated }) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [id, setId] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            const noteData = {
                title,
                content
            };
            await updateNote(id, noteData);
            setMessage("Note updated successfully!");
            // Clear the form
            setTitle("");
            setContent("");
            setId("");
            // Notify parent component to refresh notes
            if (onNoteUpdated) {
                onNoteUpdated();
            }
        } catch (error) {
            setMessage(error.response?.data?.message || "Error updating note");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="update-note-container">
            <h2>Update Note</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Note ID"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                        required
                        disabled={loading}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        disabled={loading}
                    />
                </div>
                <div className="form-group">
                    <textarea
                        placeholder="Content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                        disabled={loading}
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? "Updating..." : "Update Note"}
                </button>
            </form>
            {message && <p className="message">{message}</p>}
        </div>
    );
};

export default UpdateNotes;
