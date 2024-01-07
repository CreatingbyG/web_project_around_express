const mongoose = require("mongoose");
const urlRegex = /^(http|https):\/\/[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]+$/;

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        // Esta es una expresión regular que permite solo letras, números y espacios
        return /^[a-zA-Z0-9 ]+$/.test(v);
      },
      message: (props) => `${props.value} is not a valid card name!`,
    },
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return urlRegex.test(v);
      },
      message: (props) => `${props.value} no es una URL válida!`,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  likes: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Card = mongoose.model("Card", cardSchema);

module.exports = Card;
