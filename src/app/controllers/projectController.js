const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');
const projects = require('../models/projects');
const tasks = require('../models/tasks');

router.use(authMiddleware);

router.get('/', async (req, res) => {
    res.send({ ok: true, id: req.userId })
})

router.get('/:projectId', async (req, res) => {
    console.log(res);
    res.send({ ok: true, id: req.userId })
})

router.post('/', async (req, res) => {
    res.send({ ok: true, id: req.userId })
});

router.put('/:projectId', async (req, res) => {
    res.send({ ok: true, id: req.userId })
})

router.delete('/:projectId', async (req, res) => {
    res.send({ ok: true, id: req.userId })
})
module.exports = app => app.use('/projects', router)