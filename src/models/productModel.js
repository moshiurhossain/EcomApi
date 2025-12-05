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
    type:String,
    default:null,
}],
// ---- product price  
 price:{
    type:Number,
    required:true,
  },
// ----product varient  
  varient:[{
        varientName:{
            type:String,
            default:null,
        },
        extraPrice:{
            type:Number,
            default:null,
        },
    }],
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
  reviews:[{
        reviewerName:{
            type:mongoose.Schema.ObjectId,
            ref:'auth',
            default:null,
        },
        review:{
            type:String,
            default:null,
        }
    }] ,
//  ----product discount price
  discountPrice:{
    type:Number,
    default:null,
  },  
//  ----product tags
  tags:[{
    type:String,
    default:null,
  }],
//  ----product stock
  stock:{
    type:Number,
    required:true,
  },
// ---------------------------------------------------------------------------------------------------// 



//  ----product sku
  SKU:{
    type:String,
    required:true,
  },
//  ----product admin approval
 adminApproval:{
      type:String,
      enum:['pending','approved','rejected'],
      default:'pending',
 },
//  ----slug 
slug:{
    type:String,
    required:true,
}

})

module.exports = mongoose.model('product',productSchema)



