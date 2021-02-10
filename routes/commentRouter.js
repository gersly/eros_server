const express = require('express')
const router = express.Router()
const commentController = require('../controllers/commentController')

router.post('/comments', commentController.postCommentByPostId)
router.get('/comments/:postId', commentController.getCommentsByPostId)

module.exports = router