const express = require('express');

const router = express.Router();

const modController = require('../controllers/mod');

const auth = require('../middlewares/auth');
const modToolsAuth = require('../middlewares/modToolsAuth')

router.delete('/forum/delete', auth, modToolsAuth, modController.deleteOneForum)
router.delete('/comment/delete', auth, modToolsAuth, modController.deleteOneComment)

module.exports = router