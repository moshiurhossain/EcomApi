const express = require('express')
const { addCategory_controller } = require('../../controllers/categoryController')
const categoryApi = express.Router()

// connecting add category controller
categoryApi.post('/addcategory',addCategory_controller)


module.exports = categoryApi