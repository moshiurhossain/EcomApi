// libaries

const cartModel = require("../models/cartModel")

// add to cart
const addToCart_Controller = async (req,res)=>{
   try{
      // get data from client
      const {creatorId,cartItem,} = req.body
      // find product in db
      const existingproduct = await cartModel.findOne({creatorId})

      // 
      if(existingproduct){
      const cartProduct =   existingproduct.cartItem.map((item)=>{ 
      const filteritem = cartItem.filter((filterProduct)=>{filterProduct.productId == item.productId})

      if(filteritem){
       item.qty += 1  
       item.varient.push(cartItem[0].varient[0])
       res.status(200).json({message:`prdouct qty updated`})
      }else{
         cartItem.map((item)=>{
           existingproduct.cartItem.push(item)
         })
       
       res.status(200).json({message:`prdouct added`})
      }
      })
       return await existingproduct.save()
      }

     

      await new cartModel({
         creatorId,
         cartItem,
         
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
        const {creatorId,delteItemId} = req.body

        const existCart = await cartModel.findOne({creatorId})
        
        if(!existCart) return res.status(401).json(`cart not found`)

         if(delteItemId == existCart._id ){
            await cartModel.findByIdAndDelete(delteItemId).save()
         }else{
             await cartModel.updateOne({$pull:{cartItem:{productId:delteItemId}}})
         }


    // all ok 
    res.status(200).json(`Removed from cart`)

   }catch(err){
    console.log(err)
    res.status(500).json(`Internal server error: ${err}`)
   }
}

// get cart
const getCart_Controller = async (req,res)=>{
   try{ 

      const {userId} = req.body
      const existingCart = await cartModel.find({creatorId: userId}).populate({path:'cartItem.productId',select:'title thumbnail discountPrice'})

      if(!existingCart) return res.status(401).json(`cart does not exist`)

      // all ok
      res.status(200).json({successMessage:`get cart successfull`})
   }catch(err){
      res.status(500).json({errorMessage:err})
   }
}



// exports
module.exports = {
    addToCart_Controller,
    removeFromCart_Controller,
    getCart_Controller,
}