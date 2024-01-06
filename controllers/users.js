const User = require('../models/user');

module.exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    next(error);
  }
};

module.exports.getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId).orFail(new Error('User not found'));
    res.send(user);
  } catch (error) {
    next(error);
  }
};

module.exports.createUser = async (req, res, next) => {
  try {
    const { name, about, avatar } = req.body;

    // Validación básica del cuerpo de la solicitud
    if (typeof name !== 'string' || typeof about !== 'string' || (avatar && typeof avatar !== 'string')) {
      // Si la validación falla, lanza un error con un mensaje descriptivo
      throw new Error('Invalid input data');
    }

    const user = new User({ name, about, avatar });
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    if (error.message === 'Invalid input data') {
      res.status(400).send({ message: error.message });
    } else {
      next(error);
    }
  }
};