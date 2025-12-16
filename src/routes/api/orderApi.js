const express = require('express')
const { checkout_Controller } = require('../../controllers/orderController')
const orderApi = express.Router()


orderApi.post('/checkout',checkout_Controller)

module.exports = orderApi