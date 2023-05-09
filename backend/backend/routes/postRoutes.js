const express = require('express')
const router = express.Router()
const { createPost, showPost, upvotePost, downvotePost } = require('../controllers/postController')
const {protect} = require('../middleware/authMiddleware')

router.post('/', createPost)
router.post('/show', showPost)
router.post('/upvote', upvotePost)
router.post('/downvote', downvotePost)

module.exports = router