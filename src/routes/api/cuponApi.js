const express = require('express')
const { cuponController } = require('../../controllers/cuponController')
const cuponApi = express.Router()

cuponApi.post('/cuponcreate',cuponController)


module.exports = cuponApi