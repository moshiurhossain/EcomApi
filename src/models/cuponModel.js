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
    },
    condition:[{
        discountProductId:{
            type:mongoose.Schema.ObjectId,
            ref:'product',
        },
        appliedPrice:{
            type:Number,
            default:1000,
        }
    }],
    
},{timestamps:true})

module.exports = mongoose.model('cupon',cuponSchema)