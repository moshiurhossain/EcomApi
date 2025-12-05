// libaries
const express = require('express')
const { addProduct_Controller, ProductStatus_Controller } = require('../../controllers/productController')
const productApi = express.Router()
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

const uploadMiddleware = upload.fields([{ name: 'thumbnail', maxCount: 1 }, { name: 'subImages', maxCount: 4 }])


// addproduct api
productApi.post('/addproduct',uploadMiddleware,addProduct_Controller)
// productstatus api
productApi.post('/productstatus',ProductStatus_Controller)

// exports
module.exports = productApi