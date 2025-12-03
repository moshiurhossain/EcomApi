// --libaries


// --add product
const addProduct_Controller = (req,res)=>{
    try{
        //    const {} = req.body


        // all ok
        res.status(200).send(`Product added successfully`)

    }catch(err){
        res.status(500).send(err)
    }  
}



// --exports
module.exports ={addProduct_Controller}