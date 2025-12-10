// libaries

const cartModel = require("../models/cartModel")

// add to cart
const addToCart_Controller = async (req,res)=>{
   try{

      const {creatorId,productId,varient,qty} = req.body
      const existingproduct = cartModel.findOne({productId})

      if(existingproduct){
     if(!existingproduct.varient.includes(varient[0].varientName) ) existingproduct.varient.push(varient[0]);

     existingproduct.save()

         existingproduct.qty = existingproduct.qty +1
        return  res.status(200).json(`Added to cart`)
      }

      await new cartModel({
         creatorId,
         productId,
      }).save()


    // all ok 
    res.status(200).json(`Added to cart`)

   }catch(err){
    console.log(err)
    res.status(500).json(err)
   }
}

// remove from cart
const removeFromCart_Controller = async (req,res)=>{
   try{



    // all ok 
    res.status(200).json(`Added to cart`)

   }catch(err){
    console.log(err)
    res.status(500).json(err)
   }
}



// exports
module.exports = {
    addToCart_Controller,
    removeFromCart_Controller,
}