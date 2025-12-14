const cuponModel = require("../models/cuponModel")

// add-cupon -------------------------------------
const cuponController = async (req,res)=>{
  try{
         const {cuponName,discountPrice} = req.body

         const existingCupon = await cuponModel.findOne({cuponName})
         
         if(existingCupon) return res.status(404).json({errorMessage:`${cuponName} does not exist`})

         await new cuponModel({cuponName,discountPrice}).save()
    // all ok 
    res.status(201).json({data:`cupon created`})
  }catch(err){
    console.log(err)
    res.status(500).json({errorMessage:`Internal server error :${err}`})
  }
}

// update-cupon -------------------------------------
const cuponUpdate_controller = async (req,res)=>{
    try{

        const {cuponId,cuponName,discountPrice} = req.body

        const existingCupon = await cuponModel.findOne({_id:cuponId})

        if(cuponName) existingCupon.cuponName = cuponName

        if(discountPrice) existingCupon.discountPrice = discountPrice

        await existingCupon.save()

      // all ok 
    res.status(201).json({data:`cupon updated`})

    }catch(err){
    console.log(err)
    res.status(500).json({errorMessage:`Internal server error :${err}`})
  }
}


module.exports = {
    cuponController,
    cuponUpdate_controller,
} 