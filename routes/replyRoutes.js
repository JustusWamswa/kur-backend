const replyController = require('../controllers/replyController')
const express = require('express')
const requireAuthentication = require('../middleware/requireAuthentication')
const router = express.Router()

router.post('/getReplies', replyController.getReplies)
router.get('/getReply/:id', replyController.getReply)

// auth middleware
router.use(requireAuthentication)

router.post('/createReply', replyController.createReply)
router.put('/updateReply', replyController.updateReply)
router.delete('/deleteReply', replyController.deleteReply)


module.exports = router