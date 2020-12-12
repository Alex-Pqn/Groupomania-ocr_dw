const express = require('express')

const router = express.Router();

const forumsController = require('../controllers/forums')
const auth = require('../middlewares/auth')

router.get('/get', auth, forumsController.getAllForums) 
router.post('/create', auth, forumsController.createOneForum)

module.exports = router