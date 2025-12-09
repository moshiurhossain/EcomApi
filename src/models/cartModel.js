const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    creatorId:{
        type:String,
        require:true,
    },
    productId:{
        type:mongoose.Schema.ObjectId,
        ref:'product',
        require:true,
    },
    varient:{
        type:String,
        default:null,

    },
    quantity:{
        type:Number,
        default:1,
    },

},{timestamps})

module.exports = mongoose.model('cart',cartSchema)