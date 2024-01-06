const Card = require('../models/card');

module.exports.getCards = async (req, res) => {
  const cards = await Card.find({});
  res.send(cards);
};

module.exports.createCard = async (req, res) => {
  try {
    const { name, link } = req.body;
    const owner = req.user._id;
    const card = new Card({ name, link, owner });
    console.log(req.user._id);
    await card.save();
    res.send(card);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

module.exports.deleteCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndRemove(req.params.cardId);
    if (!card) {
      res.status(404).send({ message: 'Card not found' });
    } else {
      res.send(card);
    }
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};