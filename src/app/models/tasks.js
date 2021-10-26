const mongoose = require('../../database');

const taskSchema = new mongoose.Schema({
    title: {
        type: 'string',
        require: true,
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        require: true,
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true,
    },
    completed: {
        type: Boolean,
        require: true,
        default: false,
    },
    created_at: {
        type: Date,
        default: Date.now,
    }
})

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;