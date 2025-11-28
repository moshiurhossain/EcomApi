const authModel = require("../models/authModel")


// check user role 
const checkRole = async (req,res,next)=>{
try{
    // get email from frontend
  const {email} =req.body
//    look for existing users
const existingUser = await authModel.findOne({email})
}catch(err){
    res.status(500).send(err)
}
}
// export
module.exports = checkRole