const opportunityController = require('../controllers/opportunityController')
const express = require('express')
const router = express.Router()


router.post('/createOpportunity', opportunityController.createOpportunity)
router.get('/getOpportunities', opportunityController.getOpportunities)
router.get('/getOpportunity/:id', opportunityController.getOpportunity)
router.put('/updateOpportunity', opportunityController.updateOpportunity)
router.delete('/deleteOpportunity', opportunityController.deleteOpportunity)


module.exports = router