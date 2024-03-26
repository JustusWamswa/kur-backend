const feedbackController = require('../controllers/feedbackController')
const express = require('express')
const requireAuthentication = require('../middleware/requireAuthentication')
const router = express.Router()

router.post('/createFeedback', feedbackController.createFeedback)

// auth middleware
router.use(requireAuthentication)

router.post('/getFeedback', feedbackController.getFeedback)
router.put('/updateFeedback', feedbackController.updateFeedback)

module.exports = router