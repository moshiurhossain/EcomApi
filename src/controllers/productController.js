// --libaries
const { generateSlug, generateSKU } = require("../helpers/allGenerators")
const  cloudinary =require('cloudinary').v2
const fs = require('fs');


   // Cloudinary Configuration 
    cloudinary.config({ 
        cloud_name: 'doguuil48', 
        api_key: '835279789187353', 
        api_secret: 'O_g_uwsr6YxG73lDqL9aLxGEcJw' // Click 'View API Keys' above to copy your API secret
    });

// --add product
const addProduct_Controller = async (req,res)=>{
    try{   
        //    get data from frontend
            const {
               title,
               thumbnail,
               subImages,  /**not mandatory */
               price,
               varient, /**not mandatory */
               categoryId,
               discription,
               discountPrice, /**not mandatory */
               tags, /**not mandatory */
               stock,
            } = req.body
            
            //     generate slug and sku
                const  slug =generateSlug(title)
                const SKU = generateSKU(title)


            // get file path for thumbnail & subimage
            const thumbnailPath = req.files.thumbnail[0].path
            const subimagePath = req.files.subImages?.map((item)=>{
                return item.path ;
            })

            // upload image
           const thumbnailImage= await cloudinary.uploader.upload(thumbnailPath,{public_id:Date.now(), folder:'mernthumbnail'}, )
            fs.unlink(thumbnailPath,(err)=>{if(err)console.log(err)})
            // map subimagepath to get individual datas
          const subImage= await Promise.all(

              subimagePath.map( async (item)=>{
               const subimageLink =  await cloudinary.uploader.upload(item,{public_id:Date.now(), subimage:'mernsubimages'})
                fs.unlink(item,(err)=>{if(err)console.log(err)})
               return subimageLink
                })
          )  
            console.log(subImage)


        
         
     
          

        // all ok
        res.status(200).send(req.files)

    }catch(err){
        res.status(500).send(err)
    }  
}



// --exports
module.exports ={addProduct_Controller}