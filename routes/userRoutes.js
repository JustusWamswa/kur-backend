const userController = require('../controllers/userController')
const express = require('express')
const requireAuthentication = require('../middleware/requireAuthentication')
const router = express.Router()

router.post('/loginUser', userController.loginUser)
router.post('/createUser', userController.createUser)

// auth middleware
router.use(requireAuthentication)

router.get('/getUsers', userController.getUsers)
router.post('/getUser', userController.getUser)
router.put('/updateUser', userController.updateUser)
router.delete('/deleteUser', userController.deleteUser)


module.exports = router