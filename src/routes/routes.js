// libaries
const express = require('express')
const authApi = require('./api/authApi')
const categoryApi = require('./api/categoryApi')
const productApi = require('./api/productApi')
const route = express.Router()

// authApi
route.use('/auth',authApi)
// categoryApi
route.use('/category',categoryApi)
// productApi
route.use('/product',productApi)



// export route
module.exports = route