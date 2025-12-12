// libaries
const express = require('express')
const { addToCart_Controller, removeFromCart_Controller, getCart_Controller } = require('../../controllers/cartController')
const cartApi = express.Router()

// add to cart
cartApi.post('/addtocart',addToCart_Controller)
// remove from cart
cartApi.delete('/removefromcart',removeFromCart_Controller)
// get cart api
cartApi.get('/getcart',getCart_Controller)


// exports
module.exports = cartApi