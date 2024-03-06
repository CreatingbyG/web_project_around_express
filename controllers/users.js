const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const JWT_SECRET = "unaClaveSecretaMuyCompleja12345";

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

const getUserInfo = async (req, res, next) => {
  try {
    // req.user._id ya está disponible gracias al middleware de autenticación
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).send({ message: "Usuario no encontrado" });
    }
    res.send(user);
  } catch (error) {
    next(error);
  }
};

const createUser = async (req, res, next) => {
  try {
    const { name, about, avatar, email, password } = req.body;
    if (!email || !password) {
      throw new Error("Email y contraseña son requeridos");
    }

    const hashedPassword = await bcrypt.hash(password, 12); // 12 es el número de rondas de sal
    const user = new User({ name, about, avatar, email, password: hashedPassword });
    await user.save();
    res.status(201).send({user: user._id});
    console.log('Usuario creado')
  } catch (error) {
    if (error.name === 'MongoError' && error.code === 11000) {
      res.status(400).send({ message: "El email ya esta en uso" });
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
    if (!user) {
      return res.status(404).send({ message: "Usuario no encontrado" });
    }
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

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // Aquí se modifica la consulta para incluir explícitamente el hash de la contraseña en el resultado
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).send({ message: "Correo electrónico o contraseña incorrectos" });
    }

    // Ahora puedes usar el hash de la contraseña para la comparación
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).send({ message: "Correo electrónico o contraseña incorrectos" });
    }

    // Si la contraseña coincide, procedes a generar el token y enviar la respuesta
    const token = jwt.sign({ _id: user._id.toString() }, JWT_SECRET, { expiresIn: '7d' });

    res.send({ token });
  } catch (error) {
    console.error(error);
    next(error);
  }
};


module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateProfile,
  updateAvatar,
  login,
  getUserInfo,
};