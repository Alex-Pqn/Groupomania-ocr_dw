const express = require('express')

const router = express.Router();

const trendsController = require('../controllers/trends')
const auth = require('../middlewares/auth')

router.get('/get', auth, trendsController.getAllTrends)

module.exports = router