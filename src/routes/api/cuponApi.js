const express = require('express')
const { cuponController, cuponUpdate_controller, getCupon_Controller, deleteCupon_Controller } = require('../../controllers/cuponController')
const cuponApi = express.Router()

cuponApi.post('/cuponcreate',cuponController)
cuponApi.post('/cuponupdate',cuponUpdate_controller)
cuponApi.get('/getcupon',getCupon_Controller)
cuponApi.delete('/deletecupon', deleteCupon_Controller)


module.exports = cuponApi