// libaries

// add to cart
const addToCart_Controller = async (req,res)=>{
   try{



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