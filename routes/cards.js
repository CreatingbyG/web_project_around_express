const express = require('express');
const cardController = require('../controllers/cards');
const router = express.Router();

router.get('/', cardController.getCards);
router.post('/', cardController.createCard);
router.delete('/:cardId', cardController.deleteCard);

module.exports = router;