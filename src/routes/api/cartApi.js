// libaries
const express = require('express')
const { addToCart_Controller, removeFromCart_Controller } = require('../../controllers/cartController')
const cartApi = express.Router()

// add to cart
cartApi.post('/addtocart',addToCart_Controller)
// remove from cart
cartApi.post('/removefromcart',removeFromCart_Controller)


// exports
module.exports = cartApi