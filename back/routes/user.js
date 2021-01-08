const express = require('express');

const router = express.Router();

const userController = require('../controllers/user');
const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer-config');

router.post('/page/auth', auth, userController.pageAuth),
router.delete('/account/delete', auth, userController.deleteAccount)

router.post('/login', userController.login);
router.post('/register', userController.register);

router.post('/primaryInfos', auth, userController.getPrimaryInfos )

router.post('/parameters/get', auth, userController.getParameters);
router.post('/parameters/update', auth, multer, userController.updateParameters);

module.exports = router