const mongoose = require('mongoose');
const Card = require('../models/card');


module.exports.getCards = async (req, res, next) => {
  try {
    const cards = await Card.find({}).orFail(new Error('No cards found'));
    res.send(cards);
  } catch (error) {
    next(error);
  }
};

module.exports.createCard = async (req, res, next) => {
  try {
    const { name, link } = req.body;
    const owner = req.user._id;
    if (typeof name !== 'string') {
      // Si la validación falla, lanza un error con un mensaje descriptivo
      throw new Error('Invalid input data');
    }
    const card = new Card({ name, link, owner });
    await card.save();
    res.send(card);
  } catch (error) {
    next(error);
  }
};

module.exports.deleteCard = async (req, res, next) => {
  try {
    const card = await Card.findById(req.params.cardId)
      .orFail(() => {
        const error = new Error('Card not found');
        error.statusCode = 404;
        throw error;
      });

    // Convertir req.user._id a ObjectId si es necesario
    const userId = typeof req.user._id === 'string' ? new mongoose.Types.ObjectId(req.user._id) : req.user._id;

    if (userId.equals(card.owner)) {
      await Card.deleteOne({ _id: card._id });
      res.send({ message: 'Card deleted' });
    } else {
      res.status(403).send({ message: 'Not authorized to delete this card' });
    };
  } catch (error) {
    console.error(error);
    next(error);
  }
};