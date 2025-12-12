// libaries
const express = require('express')
const authApi = require('./api/authApi')
const categoryApi = require('./api/categoryApi')


const cartApi = require('./api/cartApi')
const productApi = require('./api/productApi')
const route = express.Router()

// authApi
route.use('/auth',authApi)
// categoryApi
route.use('/category',categoryApi)
// productApi
route.use('/product',productApi)
// cartApi
route.use('/cart',cartApi)



// export route
module.exports = route