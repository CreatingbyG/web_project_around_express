const express = require('express');
const userController = require('../controllers/users');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/signup', userController.createUser);
router.post('/signin', userController.login);
router.get('/', auth, userController.getUsers);
router.get('/:userId', auth, userController.getUserById);
router.get('/me', auth, userController.getUserInfo);
router.patch('/me', auth, userController.updateProfile);
router.patch('/me/avatar', auth, userController.updateAvatar);


module.exports = router;