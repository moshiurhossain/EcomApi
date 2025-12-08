// libaries
const express = require('express')
const { addProduct_Controller, ProductStatus_Controller, deleteProduct_controller, dashboardproduct_Controller, publicdashboard_Controller } = require('../../controllers/productController')
const productApi = express.Router()
const multer  = require('multer')
const jwtVerification = require('../../middlewares/jwtVerification')
const checkRole = require('../../middlewares/checkUserRole')
const upload = multer({ dest: 'uploads/' })

const uploadMiddleware = upload.fields([{ name: 'thumbnail', maxCount: 1 }, { name: 'subImages', maxCount: 4 }])


// add-product api
productApi.post('/addproduct',jwtVerification,checkRole(['staff','admin']),uploadMiddleware,addProduct_Controller)
// product-status api
productApi.patch('/productstatus',jwtVerification,checkRole(['admin']),ProductStatus_Controller) 
// delete-product api
productApi.delete('/deleteproduct',jwtVerification,checkRole(['admin']),deleteProduct_controller)
// dashboard-product api
productApi.get('/dashboardproduct',dashboardproduct_Controller)
// public dashboard-product api
productApi.get('publicdashboard', publicdashboard_Controller)
// exports
module.exports = productApi