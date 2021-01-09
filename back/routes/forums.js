const express = require('express');

const router = express.Router();

const forumsController = require('../controllers/forums');

const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer-config');

// global
router.get('/global/get', auth, forumsController.getAllForumsGlobal);
router.post('/global/create', auth, multer, forumsController.createOneForumGlobal);

// user
router.get('/user/get', auth, forumsController.getAllForumsUser)

// trends
router.get('/trends/get', auth, forumsController.getAllForumsTrends)


module.exports = router