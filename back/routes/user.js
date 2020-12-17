const express = require('express');

const router = express.Router();

const userController = require('../controllers/user');
const auth = require('../middlewares/auth');

router.post('/page/auth', auth, userController.pageAuth),

router.post('/login', userController.login);
router.post('/register', userController.register);

router.get('/parameters', auth, userController.getParameters);
router.put('/parameters', auth, userController.updateParameters);

module.exports = router