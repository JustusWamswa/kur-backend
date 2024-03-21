const commentController = require('../controllers/commentController')
const express = require('express')
const requireAuthentication = require('../middleware/requireAuthentication')
const router = express.Router()

router.post('/getComments', commentController.getComments)
router.get('/getComment/:id', commentController.getComment)

// auth middleware
router.use(requireAuthentication)

router.post('/createComment', commentController.createComment)
router.put('/updateComment', commentController.updateComment)
router.delete('/deleteComment', commentController.deleteComment)


module.exports = router