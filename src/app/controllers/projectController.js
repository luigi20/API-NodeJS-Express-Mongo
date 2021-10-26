const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');
const Project = require('../models/projects');
const Task = require('../models/tasks');

router.use(authMiddleware);

router.get('/', async (req, res) => {
    try {
        const projects = await Project.find().populate('user');
        return res.send({ projects });
    } catch (err) {
        return res.status(400).send({ Error: "Error Loading Projects" });
    }
})

router.get('/:projectId', async (req, res) => {
    try {
        const project = await Project.findById(req.params.projectId).populate('user');
        return res.send({ project });
    } catch (err) {
        return res.status(400).send({ Error: "Error Loading Project" });
    }
})

router.post('/', async (req, res) => {
    try {
        const project = await Project.create({ ...req.body, user: req.userId });
        return res.send({ project });
    } catch (err) {
        res.status(400).send({ Error: "Error Create in new project" });
    }
});

router.put('/:projectId', async (req, res) => {
    try {
        //const project
    } catch (err) {
        res.status(400).send({ Error: "Error in Update Project" })
    }
})

router.delete('/:projectId', async (req, res) => {
    try {
        await Project.findByIdAndDelete(req.params.projectId);
        return res.send();
    } catch (err) {
        res.status(400).send({ Error: "Error in Update Project" })
    }
})
module.exports = app => app.use('/projects', router)