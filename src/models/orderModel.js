// libaries
const mongoose = require(`mongoose`)


const orderSchema = new mongoose.Schema({
    
    name:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true,
    },
    district:{
        type:String,
        required:true,
    },
    productInfo:[{

    }],
    totalPrice:{
        type:Number,
        required:true,
    },
})

// export schema
module.exports = mongoose.model('order',orderSchema)