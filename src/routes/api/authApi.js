// libaries
const express =require('express')
const { register_Controller, verifyOtp_Controller, resendOtp_Controller, login_Controller, updateProfile_Controller } = require('../../controllers/authController')
const authApi = express.Router()
const multer  = require('multer')
const jwtVerification = require('../../middlewares/jwtVerification')
const { makeAdmin_Controller } = require('../../controllers/employeController')
const checkRole = require('../../middlewares/checkUserRole')
const upload = multer({ dest: 'uploads/' })

authApi.post('/register',register_Controller)
authApi.post('/verifyotp',verifyOtp_Controller)
authApi.get('/resendotp',resendOtp_Controller)
authApi.post('/login',login_Controller)
authApi.post('/updateprofile',upload.single('avatar') ,updateProfile_Controller)
authApi.post('/makeadmin',jwtVerification, checkRole(['admin']), makeAdmin_Controller)


// exports
module.exports = authApi