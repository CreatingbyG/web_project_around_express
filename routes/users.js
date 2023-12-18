const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const usersPath = path.join(__dirname, '../data/users.json');

router.get('/', (req, res) => {
    fs.readFile(usersPath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file from disk:', err);
            return res.status(500).json({ message: 'Error reading file' });
        }

        const users = JSON.parse(data);

        res.json(users);
    });
});

router.get('/:id', (req, res) => {
    fs.readFile(usersPath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file from disk:', err);
            return res.status(500).json({ message: 'Error reading file' });
        }

        const users = JSON.parse(data);
        const user = users.find(u => u._id === req.params.id);

        if (!user) {
            res.status(404).json({ message: 'ID users not found' });
        } else {
            res.json(user);
        }
    });
});

module.exports = router;