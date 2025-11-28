// libaries


// add category controller
const addCategory_controller = (req,res)=>{
   try{ // take data from frontend  
    const {categoryName,categoryImage}= req.body



    // all ok
    res.status(200).send(`category added `)
}catch(err){
     console.log(err)
}
}


// update category controller
const updateCategory_controller = (req,res)=>{
   try{ // take data from frontend  
    const {categoryName,categoryImage}= req.body



    // all ok
    res.status(200).send(`category updated `)
}catch(err){
     console.log(err)
}
}

// delete category controller
const deleteCategory_controller = (req,res)=>{
   try{ // take data from frontend  
    const {categoryName,categoryImage}= req.body



    // all ok
    res.status(200).send(`category deleted `)
}catch(err){
     console.log(err)
}
}
// get category controller
const getCategory_controller = (req,res)=>{
   try{ // take data from frontend  
    const {categoryName,categoryImage}= req.body



    // all ok
    res.status(200).send(`category deleted `)
}catch(err){
     console.log(err)
}
}





// exports
module.exports={
    addCategory_controller,
    updateCategory_controller,
    deleteCategory_controller,
    getCategory_controller,
}