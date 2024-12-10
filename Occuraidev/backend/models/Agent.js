const mongoose = require('mongoose');

const agentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    type: {
        type: String,
        required: true,
        enum: ['customer_service', 'data_analysis', 'task_automation']
    },
    status: {
        type: String,
        enum: ['running', 'paused', 'stopped'],
        default: 'stopped'
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    vmId: String,
    configuration: {
        memory: Number,
        cpu: Number,
        storage: Number
    },
    metrics: {
        uptime: Number,
        tasksCompleted: Number,
        lastActive: Date
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Agent', agentSchema); 