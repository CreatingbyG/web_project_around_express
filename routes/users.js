const express = require('express');
const userController = require('../controllers/users');
const auth = require('../middleware/auth');
const router = express.Router();
const { celebrate, Joi, Segments } = require('celebrate');
const validator = require('validator');

const validateURL = (value, helpers) => {
  if (validator.isURL(value, { require_protocol: true })) {
    return value;
  }
  return helpers.error('string.uri');
};

router.post('/signup', celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    about: Joi.string().required(),
    avatar: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value, { require_protocol: true })) {
        return value;
      }
      return helpers.error('string.uri');
    }),
    email: Joi.string().email().required(),
    password: Joi.string().required()
  })
}), userController.createUser);

router.post('/signin', celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().email().required().messages({
      'string.email': 'El formato del correo electrónico es inválido.',
      'any.required': 'El correo electrónico es un campo requerido.'
    }),
    password: Joi.string().required().messages({
      'any.required': 'La contraseña es un campo requerido.'
    })
  })
}), userController.login);

router.get('/', auth, userController.getUsers);

router.get('/user/:userId', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    userId: Joi.string().hex().length(24),
  }),
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required(),
  }).unknown(), // .unknown() permite otros encabezados además de los validados
}), userController.getUserById);
router.get('/me', auth, userController.getUserInfo);

router.patch('/me', auth, celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30)
  }).min(1) // Asegura que al menos uno de los campos esté presente
}), userController.updateProfile);

router.patch('/me/avatar', auth, celebrate({
  [Segments.BODY]: Joi.object().keys({
    avatar: Joi.string().required().custom(validateURL),
  })
}), userController.updateAvatar);

module.exports = router;

