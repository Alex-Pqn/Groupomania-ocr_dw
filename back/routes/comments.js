const express = require('express');

const router = express.Router();

const commentsController = require('../controllers/comments');
const auth = require('../middlewares/auth');

router.post('/get', auth, commentsController.getAllComments);
router.post('/create', auth, commentsController.createOneComment);

module.exports = router