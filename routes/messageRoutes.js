const messageController = require('../controllers/messageController')
const express = require('express')
const router = express.Router()

router.post('/createMessage', messageController.createMessage)
router.get('/getMessages', messageController.getMessages)
router.get('/getUnResolvedMessages', messageController.getUnResolvedMessages)
router.get('/getResolvedMessages', messageController.getResolvedMessages)
router.get('/getOneMessage/:id', messageController.getOneMessage)
router.put('/updateMessageStatus', messageController.updateMessageStatus)
router.delete('/deleteMessage', messageController.deleteMessage)

module.exports = router