const express = require('express')
const { addCategory_controller } = require('../../controllers/categoryController')
const multer  = require('multer')
const categoryApi = express.Router()
const upload = multer({ dest: 'uploads/' })

// connecting add category controller
categoryApi.post('/addcategory',upload.single('categoryImage'),addCategory_controller)


module.exports = categoryApi