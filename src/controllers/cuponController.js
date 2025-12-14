const cuponModel = require("../models/cuponModel")


const cuponController = async (req,res)=>{
  try{
         const {cuponName,discountPrice} = req.body

         await new cuponModel({cuponName,discountPrice}).save()
    // all ok 
    res.status(201).json({data:`cupon created`})
  }catch(err){
    console.log(err)
    res.status(500).json({errorMessage:`Internal server error :${err}`})
  }
}


module.exports = {
    cuponController,
}