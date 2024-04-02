const postLikeController = require('../controllers/postLikeController')
const commentLikeController = require('../controllers/commentLikeController')
const replyLikeController = require('../controllers/replyLikeController')
const express = require('express')
const requireAuthentication = require('../middleware/requireAuthentication')
const router = express.Router()

// auth middleware
router.use(requireAuthentication)

router.post('/getPostLike', postLikeController.getLike)
router.post('/createPostLike', postLikeController.createLike)
router.delete('/deletePostLike', postLikeController.deleteLike)
router.post('/getCommentLike', commentLikeController.getLike)
router.post('/createCommentLike', commentLikeController.createLike)
router.delete('/deleteCommentLike', commentLikeController.deleteLike)
router.post('/getReplyLike', replyLikeController.getLike)
router.post('/createReplyLike', replyLikeController.createLike)
router.delete('/deleteReplyLike', replyLikeController.deleteLike)

module.exports = router

