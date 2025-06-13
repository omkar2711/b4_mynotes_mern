// Import React for building the component
import React from 'react';
// Import styles for the note card
import '../styles/NoteCard.css';

// NoteCard component displays a single note
// Props:
//   note: the note object to display
//   onDelete: function to call when deleting the note
const NoteCard = ({ note, onDelete }) => {
    // Helper function to format the note's creation date
    // Shows 'Today', 'Yesterday', weekday, or short date
    const formatDate = (date) => {
        const now = new Date();
        const noteDate = new Date(date);
        const diffTime = Math.abs(now - noteDate);
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 0) {
            return 'Today'; // If created today
        } else if (diffDays === 1) {
            return 'Yesterday'; // If created yesterday
        } else if (diffDays < 7) {
            return noteDate.toLocaleDateString('en-US', { weekday: 'long' }); // Day of week
        } else {
            return noteDate.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric'
            }); // Short date
        }
    };

    // Render the note card
    return (
        <div className="note-card">
            {/* Show the note title if present */}
            {note.title && <h3>{note.title}</h3>}
            {/* Show the note content */}
            <p>{note.content}</p>
            <div className="note-footer">
                {/* Show the formatted creation date */}
                <small className="note-date">
                    {formatDate(note.createdAt)}
                </small>
                <div className="note-actions">
                    {/* Delete button with trash icon */}
                    <button 
                        onClick={() => onDelete(note._id)}
                        className="delete-btn"
                        title="Delete note"
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" fill="currentColor"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

// Export the component for use in the notes grid
export default NoteCard; 