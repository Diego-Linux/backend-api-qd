const router = require('express').Router();
const userController = require('../controllers/userController');

const isAuth = require('../middleware/isAuth');

router.patch('/', isAuth, userController.editProfile);

router.patch('/change-passw', isAuth, userController.changePassword);

module.exports = router;