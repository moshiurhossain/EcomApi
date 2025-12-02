const authModel = require("../models/authModel")


// check user role 
const checkRole =  (roles)=>{
// console.log(roles)
 return (req,res,next)=>{
  if( roles[0] == req.user.userRole || roles[1] == req.user.userRole){
    next()
  }else{
    // res.stauts(404).send('your not authrized for this action')
    res.send('your not authorized')
  }
// console.log(roles)
// console.log(req.user.userRole)

 }

}
// export
module.exports = checkRole