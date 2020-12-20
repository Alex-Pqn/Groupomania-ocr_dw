const express = require('express');

const router = express.Router();

const userController = require('../controllers/user');
const validator = require('../middlewares/data-validation')
const auth = require('../middlewares/auth');

router.post('/page/auth', auth, userController.pageAuth),

router.post('/login', validator, userController.login);
router.post('/register', validator, userController.register);

router.get('/parameters', auth, userController.getParameters);
router.put('/parameters', auth, userController.updateParameters);

module.exports = router