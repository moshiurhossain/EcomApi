// libaries
const express = require('express')
const { addProduct_Controller, ProductStatus_Controller } = require('../../controllers/productController')
const productApi = express.Router()
const multer  = require('multer')
const jwtVerification = require('../../middlewares/jwtVerification')
const checkRole = require('../../middlewares/checkUserRole')
const upload = multer({ dest: 'uploads/' })

const uploadMiddleware = upload.fields([{ name: 'thumbnail', maxCount: 1 }, { name: 'subImages', maxCount: 4 }])


// addproduct api
productApi.post('/addproduct',jwtVerification,checkRole(['staff','admin']),uploadMiddleware,addProduct_Controller)
// productstatus api
productApi.patch('/productstatus',jwtVerification,checkRole(['admin']),ProductStatus_Controller)

// exports
module.exports = productApi