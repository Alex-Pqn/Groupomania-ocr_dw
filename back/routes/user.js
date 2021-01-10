const express = require('express');

const router = express.Router();

const userController = require('../controllers/user');
const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer-config');

router.get('/page/auth', auth, userController.pageAuth),

router.get('/account/primaryInfos', auth, userController.getPrimaryInfos)
router.delete('/account/delete', auth, userController.deleteAccount)

router.post('/login', userController.login);
router.post('/register', userController.register);

router.get('/parameters/get', auth, userController.getParameters);
router.patch('/parameters/update', auth, multer, userController.updateParameters);

module.exports = router