const express = require('express');

const router = express.Router();

const trendsController = require('../controllers/trends');

const auth = require('../middlewares/auth');

// trends
router.get('/get', auth, trendsController.getAllForums)


module.exports = router