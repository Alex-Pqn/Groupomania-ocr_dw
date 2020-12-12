const express = require('express')

const router = express.Router();

const commentsController = require('../controllers/comments')
const auth = require('../middlewares/auth')

router.post('/comments/get', auth, commentsController.getAllComments)
router.post('/comments/create', auth, commentsController.createOneComment)

module.exports = router