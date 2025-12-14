const mongoose = require('mongoose')
const { schema } = require('./authModel')



const cuponSchema = new mongoose.Schema({
    cuponName:{
        type:String,
        required:true,
    }, 
    discountPrice:{
        type:Number,
        required:true,
    }
},{timestamps:true})

module.exports = mongoose.model('cupon',cuponSchema)