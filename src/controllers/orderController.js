const { emailRegex } = require("../helpers/Regex")
const cartModel = require("../models/cartModel")
const cuponModel = require("../models/cuponModel")

// ---------------place order
const checkout_Controller = async (req,res)=>{
    try{
        // get data from client
        const {name,phone,email,address,cupon,cartId,district}=req.body
        // check validation
        if(!name || !phone || !email || !address || !cartId  ) return res.status(401).json(`must fill in all the details`)
        // check email validation
        if(!emailRegex.test(email)) return res.status(401).json(`not a valid email`)
        // create empty cupon data object
        let cuponData ={}
        // if cupon exists find in db
        if(cupon){ 
            cuponData = await cuponModel.findOne({cuponName:cupon})
        }

            //delivery charge by disrict
            let deliveryCharge = 80
            
            if(district != 'Dhaka') deliveryCharge = 120

            const existingCartPrice = await cartModel.findOne({_id:cartId})


            res.status(200).json(cuponData)

    //    all ok
    // res.status(200).json({successMessage:`Order placed successfully`})

    }catch(err){
        console.log(err)
        res.status(500).json({errorMessage:`internal server error ${err}`})
    }
}

// ---------------place order
const placeOrder_Controller = async (req,res)=>{
    try{
     
    //    all ok
    res.status(200).json({successMessage:`Order placed successfully`})

    }catch(err){
        console.log(err)
        res.status(500).json({errorMessage:`internal server error ${err}`})
    }
}
// ---------------get all order
const getAllOrder_Controller = async (req,res)=>{
    try{
     
    //    all ok
    res.status(200).json({successMessage:`Order placed successfully`})

    }catch(err){
        console.log(err)
        res.status(500).json({errorMessage:`internal server error ${err}`})
    }
}
// ---------------get order by filter
const getFilterOrder_Controller = async (req,res)=>{
    try{
     
    //    all ok
    res.status(200).json({successMessage:`Order placed successfully`})

    }catch(err){
        console.log(err)
        res.status(500).json({errorMessage:`internal server error ${err}`})
    }
}

module.exports = {
    checkout_Controller,
    placeOrder_Controller,
    getAllOrder_Controller,
    getFilterOrder_Controller,
}