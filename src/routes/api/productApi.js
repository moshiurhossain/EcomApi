const express = require('express')
const { addProduct_Controller } = require('../../controllers/productController')
const productApi = express.Router()


productApi.post('/addproduct',addProduct_Controller)

// exports
module.exports = productApi