// libaries
const express = require('express')
const authApi = require('./api/authApi')
const categoryApi = require('./api/categoryApi')
const route = express.Router()

// authApi
route.use('/auth',authApi)
// categoryApi
route.use('/category',categoryApi)



// export route
module.exports = route