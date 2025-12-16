


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
    placeOrder_Controller,
    getAllOrder_Controller,
    getFilterOrder_Controller,
}