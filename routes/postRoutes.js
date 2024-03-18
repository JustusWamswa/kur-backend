const postController = require('../controllers/postController')
const express = require('express')
const requireAuthentication = require('../middleware/requireAuthentication')
const router = express.Router()

router.get('/getPosts', postController.getPosts)
router.get('/getPost/:id', postController.getPost)

// auth middleware
router.use(requireAuthentication)

router.post('/createPost', postController.createPost)
router.put('/updatePost', postController.updatePost)
router.delete('/deletePost', postController.deletePost)
router.post('/addLike', postController.addLike)
router.post('/removeLike', postController.removeLike)


module.exports = router