const mongoose = require('../../database');

const projectSchema = new mongoose.Schema({
    title: {
        type: 'string',
        require: true,
    },
    description: {
        type: 'string',
        require: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    tasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task',
    }],

    created_at: {
        type: Date,
        default: Date.now,
    }
})

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;