// auth va a contener las rutas de autorizacion

// * Login
// * Register
// * Recovery.Password
// * Verify.User

const router = require('express').Router()

// const {application} = require('r')
const {registerUser} = require('../users/users.services')
const authServices = require('./auth.services')

router.post('/register', registerUser)
router.post('/login', authServices.login)

module.exports = router