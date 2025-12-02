const authModel = require("../models/authModel")



// make employe controller 
const makeAdmin_Controller =async (req,res)=>{
   try{
     const {staffId} = req.body
    
      await authModel.findByIdAndUpdate(staffId,{userRole:'admin'})
    // all ok
    res.status(200).send(`user has been promoted to admin`)
   }catch(err){
    res.status(404).send(err)
   }
}

module.exports = {
    makeAdmin_Controller,
}