const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');
const Project = require('../models/projects');
const Task = require('../models/tasks');

router.use(authMiddleware);

router.get('/', async (req, res) => {
    try {
        const projects = await Project.find().populate(['user', 'tasks']);
        return res.send({ projects });
    } catch (err) {
        return res.status(400).send({ Error: "Error Loading Projects" });
    }
})

router.get('/:projectId', async (req, res) => {
    try {
        const project = await Project.findById(req.params.projectId).populate(['user', 'tasks']);
        return res.send({ project });
    } catch (err) {
        return res.status(400).send({ Error: "Error Loading Project" });
    }
})

router.post('/', async (req, res) => {
    try {
        const { title, description, tasks } = req.body;
        const project = await Project.create({ title, description, user: req.userId });
        await Promise.all(tasks.map(async task => {
            const projectTask = new Task({ ...task, project: project._id });
            await projectTask.save();
            project.tasks.push(projectTask);
        }));
        await project.save();
        return res.send({ project });
    } catch (err) {

        res.status(400).send({ Error: "Error Creating New Project" });
    }
});

router.put('/:projectId', async (req, res) => {
    try {
        const { title, description, tasks } = req.body;
        const project = await Project.findByIdAndUpdate(req.params.projectId, {
            title,
            description,
        }, { new: true });

        project.tasks = [];
        await Task.deleteMany({ project: project._id });
        await Promise.all(tasks.map(async task => {
            const projectTask = new Task({ ...task, project: project._id });
            await projectTask.save();
            project.tasks.push(projectTask);
        }));
        await project.save();
        return res.send({ project });
    } catch (err) {

        res.status(400).send({ Error: "Error Updating Project" });
    }
})

router.delete('/:projectId', async (req, res) => {
    try {
        await Project.findByIdAndDelete(req.params.projectId);
        return res.send();
    } catch (err) {
        res.status(400).send({ Error: "Error Deleting Project" })
    }
})
module.exports = app => app.use('/projects', router)