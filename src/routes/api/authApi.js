// libaries
const express =require('express')
const { register_Controller, verifyOtp_Controller, resendOtp_Controller } = require('../../controllers/authController')
const authApi = express.Router()

authApi.post('/register',register_Controller)
authApi.post('/verifyotp',verifyOtp_Controller)
authApi.get('/resendotp',resendOtp_Controller)


// exports
module.exports = authApi