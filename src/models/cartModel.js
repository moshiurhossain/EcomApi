const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    creatorId:{
        type:String,
        require:true,
    },
    cartItem:[
        {
            productId:{
            type:mongoose.Schema.ObjectId,
            ref:'product',
            require:true,
               },
        }
    ],
    varient:[{
        varientName:{
            type:String,
            default:null,
        },
    }],
    qty:{
        type:Number,
        default:1,
    },

},{timestamps:true})

module.exports = mongoose.model('cart',cartSchema)