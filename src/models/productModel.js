const mongoose = require('mongoose')


const productSchema = mongoose.Schema({
// ----product title 
  title:{
    type:String,
    required:true,
  },
// ---- product thumbnail image  
  thumbnail:{
    type:String,
    required:true,
  },
// ---- product sub-images  
  subImages:[{
    type:String,default:null,
}],
// ---- product price  
 price:{
    type:Number,
    required:true,
  },
// ----product varient  
  varient:[
    {
        varientName:{
            type:String,
            default:null,
        },
        extraPrice:{
            type:Number,
            default:null,
        },
    }
   
  ],
// ----category Id  
  categoryId:{
    type:mongoose.Schema.ObjectId,
    ref:'category',
    required:true,
  },
//  ----product discription
  discription:{
    type:String,
    required:true,
  },
//  ----product review
  reviews:[
    {
        reviewerName:{
            type:mongoose.Schema.ObjectId,
            ref:'auth'
        },
        review:{
            type:String,
            required:true,
        }
    }
  ] ,
//  ----product discount price
  discountPrice:{
    type:Number,
    default:null,
  },  
//  ----product discount price   
})

module.exports = mongoose.model('product',productSchema)



