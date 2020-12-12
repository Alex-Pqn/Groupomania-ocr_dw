const express = require('express')

const router = express.Router();

const userController = require('../controllers/user')

router.post('/login', userController.login)
router.post('/register', userController.register)

router.get('/parameters', auth, userController.getParameters)
router.put('/parameters', auth, userController.updateParameters)

module.exports = router