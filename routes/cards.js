const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const cardsPath = path.join(__dirname, '../data/cards.json');

router.get('/', (req, res) => {
    fs.readFile(cardsPath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file from disk:', err);
            return res.status(500).json({ message: 'Error reading file' });
        }

        const cards = JSON.parse(data);

        res.json(cards);
    });
});

router.get('/:id', (req, res) => {
  fs.readFile(cardsPath, 'utf8', (err, data) => {
      if (err) {
          console.error('Error reading file from disk:', err);
          return res.status(500).json({ message: 'Error reading file' });
      }

      const cards = JSON.parse(data);
      const card = cards.find(c => c._id === req.params.id);

      if (!card) {
          res.status(404).json({ message: 'ID card not found' });
      } else {
          res.json(card);
      }
  });
});

module.exports = router;