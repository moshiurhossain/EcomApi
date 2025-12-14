const express = require('express')
const { cuponController, cuponUpdate_controller } = require('../../controllers/cuponController')
const cuponApi = express.Router()

cuponApi.post('/cuponcreate',cuponController)
cuponApi.post('/cuponupdate',cuponUpdate_controller)


module.exports = cuponApi