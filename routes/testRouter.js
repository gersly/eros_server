const express = require('express')
const router = express.Router()
const testController = require('../controllers/testController')

router.get('/tests/main', testController.main)

module.exports = router