const User = require("../models/user");

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId).orFail(
      new Error("Usario no encontrado")
    );
    res.send(user);
  } catch (error) {
    next(error);
  }
};

const createUser = async (req, res, next) => {
  try {
    const { name, about, avatar } = req.body;
    if (
      typeof name !== "string" ||
      typeof about !== "string" ||
      (avatar && typeof avatar !== "string")
    ) {
      throw new Error("Datos invalidos");
    }

    const user = new User({ name, about, avatar });
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    if (error.message === "Datos invalidos") {
      res.status(400).send({ message: error.message });
    } else {
      next(error);
    }
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const update = req.body;
    const user = await User.findByIdAndUpdate(userId, update, { new: true });
    res.send(user);
  } catch (error) {
    next(error);
  }
};

const updateAvatar = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { avatar } = req.body;
    const user = await User.findByIdAndUpdate(
      userId,
      { avatar },
      { new: true }
    );
    res.send(user);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateProfile,
  updateAvatar
};