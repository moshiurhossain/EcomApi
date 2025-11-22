// libaries
const mongoose = require(`mongoose`)

// auth schema
const authSchema =  new mongoose.Schema({
    // userName
   userName:{
    type:String,
    required:true,
   },
    // email
   email:{
    type:String,
    required:true,
   },
    // password
   password:{
    type:String,
    required:true,
   },
    // phone
   phone:{
    type:String,
    required:true,
   },
//    avatar
   avatar:{
    type:String,
    default:'https://www.google.com/url?sa=i&url=https%3A%2F%2Fpngtree.com%2Fso%2Fuser-avatar-vector&psig=AOvVaw26HEE1r6YAIyvSFClw7tNY&ust=1761598773931000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCMCvm5PgwpADFQAAAAAdAAAAABAL',
   },
//    otp
   otp:{
    type:Number,
    default:null,
   },
//    otp expire time
   expireOtpTime:{
    type:Date,
    default:null,
   },

//    user Role
 userRole:{
    type:String,
    enum:['user','admin','staff'],
    default:'user',
 },
//  address
 address:{
    type:String,
    required:true,
 },
//  is verified

 isVerified:{
    type:Boolean,
    default:false,
 }


},{timestamps:true})
// export schema
module.exports = mongoose.model('auth',authSchema)