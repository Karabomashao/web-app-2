const express = require('express')
const router = express.Router()
const {login, register, registerSME, registerSMEUser} = require('../contollers/authController')
const validateUserBody = require('../middleware/validateUserBody')
const validateLoginBody = require('../middleware/validateLoginBody')
const requireRole = require('../middleware/requireRole')


router.post('/login', validateUserBody, login)
router.post('/register', validateLoginBody, registerSME)
router.post('/register-user', validateLoginBody, registerSMEUser)

module.exports = router