const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    creatorId:{
        type:String,
        require:true,
    },
    cartItem:[
        {  
            // product id -----------------------
            productId:{
                type:mongoose.Schema.ObjectId,
                ref:'product',
                require:true,
               },
            // product guantity -----------------------   
            qty:{
                type:Number,
                default:1,
                },
            // product varient -----------------------
            varient:[{
                varientName:{
                type:String,
                default:null,
                            },
                    }],    
           
        },
        
    ],
   
   

},{timestamps:true})

module.exports = mongoose.model('cart',cartSchema)