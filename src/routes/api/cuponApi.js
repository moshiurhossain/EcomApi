const express = require('express')
const { cuponController } = require('../../controllers/cuponController')
const cuponApi = express.Router()

cuponApi.post('/cupon',cuponController)


module.exports = cuponApi