const express = require('express');

const router = express.Router();

const forumsController = require('../controllers/forums');
const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer-config');

router.get('/get', auth, forumsController.getAllForums);
router.post('/create', auth, multer, forumsController.createOneForum);

module.exports = router