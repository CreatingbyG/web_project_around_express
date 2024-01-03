const mongoose = require('mongoose');
const urlRegex = /^(http|https):\/\/[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]+$/;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return urlRegex.test(v);
      },
      message: props => `${props.value} no es una URL válida!`
    }
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;