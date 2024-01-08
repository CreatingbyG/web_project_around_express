const mongoose = require("mongoose");
const Card = require("../models/card");

const getCards = async (req, res, next) => {
  try {
    const cards = await Card.find({}).orFail(new Error("Carta no encontrada"));
    res.send(cards);
  } catch (error) {
    next(error);
  }
};

const createCard = async (req, res, next) => {
  try {
    const { name, link } = req.body;
    const owner = req.user._id;
    if (typeof name !== "string") {
      throw new Error("Datos Invalidos");
    }
    const card = new Card({ name, link, owner });
    await card.save();
    res.send(card);
  } catch (error) {
    next(error);
  }
};

const deleteCard = async (req, res, next) => {
  try {
    const card = await Card.findById(req.params.cardId).orFail(() => {
      const error = new Error("Carta no encontrada");
      error.statusCode = 404;
      throw error;
    });

    const userId =
      typeof req.user._id === "string"
        ? new mongoose.Types.ObjectId(req.user._id)
        : req.user._id;

    if (userId.equals(card.owner)) {
      await Card.deleteOne({ _id: card._id });
      res.send({ message: "Card deleted" });
    } else {
      res
        .status(403)
        .send({ message: "No tiene autorizacion para eliminar esta carta" });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const likeCard = async (req, res, next) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true }
    );
    res.send(card);
  } catch (error) {
    next(error);
  }
};

const dislikeCard = async (req, res, next) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true }
    );
    res.send(card);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard
};