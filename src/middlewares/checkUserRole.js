const authModel = require("../models/authModel")


// check user role 
const checkRole = async (req,res,next)=>{
try{
 console.log(req.user)
}catch(err){
    res.status(500).send(err)
}
}
// export
module.exports = checkRole