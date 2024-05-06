const express = require('express');
const mongoose = require('mongoose');
const Task = require('./modules/user'); // Assuming you have a Task model defined in task.js
const { name } = require('ejs');
const app = express();

// Connect to MongoDB database
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Render index page
app.get('/server', (req, res) => {
    res.render('index');
});

// Create a new task
app.post('/data', async (req, res) => {
    let { title, details } = req.body;
    let userDetails = await Task.create({
        name: title,
        details: details
    });
    res.redirect('/server/profile')
});

// Fetch all tasks
app.get('/server/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({});
        res.send(tasks);
    } catch (err) {
        console.error('Error fetching tasks:', err);
        res.status(500).send('Error fetching tasks');
    }
});

app.get('/server/tasks/:username', async (req, res) => {
    try {
        const profile = await Task.findOne({ name: req.params.username });
        res.render('profile', { name: profile.name, details: profile.details });
    } catch (err) {
        console.error('Error fetching profile:', err);
        res.status(500).send('Error fetching profile');
    }
});

app.get('/server/profile', async (req, res) => {
    const profile = await Task.findOne({});
    res.render('profile', { name: profile.name, details: profile.details });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
