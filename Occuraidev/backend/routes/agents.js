const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Agent = require('../models/Agent');
const VMService = require('../services/VMService');

router.post('/', auth, async (req, res) => {
    try {
        const { name, description, type, configuration } = req.body;
        
        // Create VM instance
        const vm = await VMService.createVM(configuration);
        
        const agent = new Agent({
            name,
            description,
            type,
            owner: req.userData.userId,
            vmId: vm.id,
            configuration
        });

        await agent.save();
        res.status(201).json(agent);
    } catch (error) {
        res.status(500).json({ message: 'Error creating agent' });
    }
});

router.get('/', auth, async (req, res) => {
    try {
        const agents = await Agent.find({ owner: req.userData.userId });
        res.json(agents);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching agents' });
    }
});

router.post('/:id/control', auth, async (req, res) => {
    try {
        const { action } = req.body;
        const agent = await Agent.findOne({
            _id: req.params.id,
            owner: req.userData.userId
        });

        if (!agent) {
            return res.status(404).json({ message: 'Agent not found' });
        }

        switch (action) {
            case 'start':
                await VMService.startVM(agent.vmId);
                agent.status = 'running';
                break;
            case 'pause':
                await VMService.pauseVM(agent.vmId);
                agent.status = 'paused';
                break;
            case 'stop':
                await VMService.stopVM(agent.vmId);
                agent.status = 'stopped';
                break;
        }

        await agent.save();
        res.json(agent);
    } catch (error) {
        res.status(500).json({ message: 'Error controlling agent' });
    }
});

module.exports = router; 