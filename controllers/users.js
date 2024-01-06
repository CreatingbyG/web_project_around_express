const User = require('../models/user');

module.exports.getUsers = async (req, res) => {
  const users = await User.find({});
  res.send(users);
};

module.exports.getUserById = async (req, res) => {
  const user = await User.findById(req.params.userId);
  res.send(user);
};

module.exports.createUser = async (req, res) => {
  try {
    const { name, about, avatar } = req.body;
    const user = new User({ name, about, avatar });
    await user.save();
    res.send(user);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};