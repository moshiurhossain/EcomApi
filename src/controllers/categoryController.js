// libaries
const  cloudinary =require('cloudinary').v2
const fs = require('fs');
const categoryModel = require('../models/categoryModel');

   // Cloudinary Configuration 
    cloudinary.config({ 
        cloud_name: 'doguuil48', 
        api_key: '835279789187353', 
        api_secret: 'O_g_uwsr6YxG73lDqL9aLxGEcJw' // Click 'View API Keys' above to copy your API secret
    });


// add category controller
const addCategory_controller =async (req,res)=>{
   try{ 
    // take data from frontend  
    const {categoryName,creatorName}= req.body
    // check for empty field 
    if(!categoryName || !creatorName ) return res.status(401).send('need to fill in all details')
    
    const categoryImage = await cloudinary.uploader.upload(req.file.path,{public_id:Date.now()})
     if(!categoryImage) return res.status(404).send(`you must select category image`)
   

    await new categoryModel({
        categoryName,
        creatorName,
        categoryImage:categoryImage.url,
        
    }).save()
     
    fs.unlink(req.file.path,(err)=>{if(err)console.log(err)})



    // all ok
    res.status(200).send(`category added `)
}catch(err){
     console.log(err)
}
}


// update category controller
const updateCategory_controller = async (req,res)=>{
   try{ // take data from frontend  
    const {categoryid,updateStatus}= req.body
//    check for category id
    if(!categoryid) return res.status(404).send(`category is required`)
     
        
    await  categoryModel.findByIdAndUpdate(categoryid,{adminApproval:updateStatus})
        
        if(updateStatus !='approved'&& updateStatus !='rejected') return res.status(401).send(`please change status`)


    // all ok
    res.status(200).send(`category updated  `)
}catch(err){
     console.log(err)
}
}

// delete category controller
const deleteCategory_controller = async (req,res)=>{
   try{ // take data from frontend  
    const {categoryid}= req.body
    //    check for category id
    if(!categoryid) return res.status(404).send(`category is required`)

    await categoryModel.findByIdAndDelete(categoryid)    



    // all ok
    res.status(200).send(`category deleted `)
}catch(err){
     console.log(err)
}
}
// get category controller
const getAllCategory_controller = async (req,res)=>{
   try{ // take data from frontend  
   
 const all_category = await categoryModel.find()


    // all ok
    res.status(200).send( all_category)
}catch(err){
     console.log(err)
}
}





// exports
module.exports={
    addCategory_controller,
    updateCategory_controller,
    deleteCategory_controller,
    getAllCategory_controller,
}