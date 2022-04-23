const router = require('express').Router();
const authController = require('../controllers/authController');

const { validRegister } = require('../middleware/validation');

router.post('/register', validRegister, authController.createUser);

router.post('/login', authController.userLogin);

router.patch('/forgot-password', authController.forgotPassword);

router.patch('/reset-password', authController.resetPassword);

router.post('/refresh_token', authController.generateAccessToken);

module.exports = router;