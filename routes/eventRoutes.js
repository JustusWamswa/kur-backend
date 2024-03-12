const eventController = require('../controllers/eventController')
const express = require('express')
const requireAuthentication = require('../middleware/requireAuthentication')
const router = express.Router()

router.get('/getEvents', eventController.getEvents)
router.get('/getEvent/:id', eventController.getEvent)

// auth middleware
router.use(requireAuthentication)

router.post('/createEvent', eventController.createEvent)
router.put('/updateEvent', eventController.updateEvent)
router.delete('/deleteEvent', eventController.deleteEvent)
router.post('/addAttendee', eventController.addAttendee)
router.post('/removeAttendee', eventController.removeAttendee)


module.exports = router