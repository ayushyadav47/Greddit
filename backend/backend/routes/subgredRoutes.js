const express = require('express')
const router = express.Router()
const { registerSubgred, showSubgred, showallSubgred, showMysubgred } = require('../controllers/subgredController')
const {protect} = require('../middleware/authMiddleware')

router.post('/', registerSubgred)
router.post('/show', showSubgred)
router.post('/showall', showallSubgred)
router.post('/showMysubgred', showMysubgred)

module.exports = router