// libaries
const express = require('express')
const authApi = require('./api/authApi')
const route = express.Router()

// authApi
route.use('/auth',authApi)



// export route
module.exports = route