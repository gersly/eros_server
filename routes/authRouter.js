const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')

router.get('/auth/login', authController.login)

module.exports = router