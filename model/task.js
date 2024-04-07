const mongoose = require('mongoose');

// Define Task schema
const taskSchema = new mongoose.Schema({
    
    id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user', 
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    deadline: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

// Create Task model
const Task = mongoose.model('task', taskSchema);

module.exports = Task;
