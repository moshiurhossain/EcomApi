const express = require('express')
const { addCategory_controller, updateCategory_controller, deleteCategory_controller, getAllCategory_controller, getActiveCategory_controller } = require('../../controllers/categoryController')
const multer  = require('multer')
const jwtVerification = require('../../middlewares/jwtVerification')
const checkRole = require('../../middlewares/checkUserRole')
const categoryApi = express.Router()
const upload = multer({ dest: 'uploads/' })

// connecting add category controller
categoryApi.post('/addcategory',jwtVerification,checkRole, upload.single('categoryImage'),addCategory_controller)
categoryApi.post('/updatecategory',updateCategory_controller)
categoryApi.post('/deletecategory',deleteCategory_controller)
categoryApi.get('/getallcategory',jwtVerification, checkRole(['admin','staff']) ,getAllCategory_controller)
categoryApi.get('/activecategory',getActiveCategory_controller)


module.exports = categoryApi