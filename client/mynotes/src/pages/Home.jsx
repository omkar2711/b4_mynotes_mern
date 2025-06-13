import React, { useState } from 'react';
import AddNote from '../components/AddNote';
import UpdateNotes from '../components/UpdateNotes';
import GetallNotes from '../components/GetallNotes';
import '../styles/NotesApp.css';

const Home = () => {
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    const handleNoteAdded = () => {
        setRefreshTrigger(prev => prev + 1);
    };

    const handleNoteUpdated = () => {
        setRefreshTrigger(prev => prev + 1);
    };

    return (
        <div className="home-container">
            <h1>Notes App</h1>
            <div className="notes-app-container">
                <div className="notes-form-section">
                    <AddNote onNoteAdded={handleNoteAdded} />
                    <UpdateNotes onNoteUpdated={handleNoteUpdated} />
                </div>
                <div className="notes-list-section">
                    <GetallNotes key={refreshTrigger} />
                </div>
            </div>
        </div>
    );
};

export default Home;