// Import mongoose for MongoDB object modeling
const mongoose = require('mongoose');

// Define the schema for a Note document
const noteSchema = new mongoose.Schema({
    // Title of the note (required, trimmed string)
    title: {
        type: String,
        required: true,
        trim: true
    },
    // Content/body of the note (required string)
    content: {
        type: String,
        required: true
    },
    // Timestamp for when the note was created (defaults to now)
    createdAt: {
        type: Date,
        default: Date.now
    },
    // Timestamp for when the note was last updated (defaults to now)
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Export the Note model for use in controllers/routes
module.exports = mongoose.model("Note", noteSchema);