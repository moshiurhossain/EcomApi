// libaries
const express =require('express')
const { register_Controller } = require('../../controllers/authController')
const authApi = express.Router()

authApi.post('/register',register_Controller)


// exports
module.exports = authApi