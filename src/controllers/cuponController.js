const cuponModel = require("../models/cuponModel")


const cuponController = async (req,res)=>{
  try{
         const {cuponName,discountPrice} = req.body

         const existingCupon = await cuponModel.findOne({cuponName})
         
         if(!existingCupon) return res.status(404).json({errorMessage:`${cuponName} already exists`})

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