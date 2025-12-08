// --libaries
const { generateSlug, generateSKU } = require("../helpers/allGenerators")
const  cloudinary =require('cloudinary').v2
const fs = require('fs');
const productModel = require("../models/productModel");
const { json } = require("stream/consumers");
const { default: mongoose } = require("mongoose");


   // Cloudinary Configuration 
    cloudinary.config({ 
        cloud_name: 'doguuil48', 
        api_key: '835279789187353', 
        api_secret: 'O_g_uwsr6YxG73lDqL9aLxGEcJw' // Click 'View API Keys' above to copy your API secret
    });

// --add product -------------------------------------------------------------------------
const addProduct_Controller = async (req,res)=>{
    try{   
        //    get data from frontend
            const {
               title,
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
               const subimageLink =  await cloudinary.uploader.upload(item,{public_id:Date.now()})
                fs.unlink(item,(err)=>{if(err)console.log(err)})
               return subimageLink.url
                })
          )  
            console.log(subImage)
            console.log(thumbnailImage.url)


        //  save to db
        await new productModel({
            title,
            thumbnail:thumbnailImage.url,
            subImages:subImage,
            price,
            varient:JSON.parse(varient),
            categoryId,
            discription,
            discountPrice,
            tags,
            stock,
            SKU,
            slug,

        }).save()
         
     
          

        // all ok
        res.status(200).json('product uploaded')

    }catch(err){
        console.log(err)
        res.status(500).json(err)
    }  
}

// ------------update product status -------------------------------------------------------------------------
const ProductStatus_Controller = async(req,res)=>{
  try{ 

        const {productId, status} = req.body
        
        const existingProduct = await productModel.findByIdAndUpdate(productId,{adminApproval:status})
        
        if(status != 'approved' && status != 'rejected') return res.status(401).json('you must change status')
     

     // all ok
        res.status(200).json('product status changed')
  }catch(er){
      console.log(err)
        res.status(500).json(err)
  }
}

// delete product controller -------------------------------------------------------------------------
const deleteProduct_controller= async (req,res)=>{
    try{ 
        const {productId} =req.body

        await productModel.findByIdAndDelete(productId)


        // all ok
        res.status(200).json('product deleted')

    }catch(er){
      console.log(err)
        res.status(500).json(err)
  }
}

// dashboard products staff-------------------------------------------------------------------------
const dashboardproduct_Controller = async (req,res)=>{
    try{
        // filter by  category of get all products
         const {filterProduct}=req.body
        // create empty object
        const filterBy ={}
        const sortByPrice ={}
        
        // get query params
        const {limit,page, minprice,maxprice,sortBy} = req.query


        const limitperPage = limit || 6
        const productSkip = limitperPage*(page-1)
        
        // sort by max and min price
        if(minprice && maxprice)  filterBy.discountPrice ={$gte:minprice,$lte:maxprice}

         // sort by category 
        if(filterProduct != 'all') filterBy.categoryId =filterProduct
        // sort from high to low or visversa
        if(sortBy=='lowtohigh') sortByPrice.discountPrice =1
        if(sortBy=='hightolow') sortByPrice.discountPrice =-1
        
        // display product from db
        const products = await productModel.find(filterBy).limit(limitperPage).skip(productSkip).sort(sortByPrice)


        // all ok
        res.status(200).json({products,limit:limitperPage,skip:productSkip,totalProduct:products.length})

    }catch(er){
      console.log(err)
        res.status(500).json(err)
  }
}

// dashboard products client-------------------------------------------------------------------------
const publicdashboard_Controller =async(req,res)=>{
try{
        // filter by  category of get all products
         const {filterProduct}=req.body
        // create empty object
        const filterBy ={
            adminApproval:'approved'
        }
        const sortByPrice ={}
        
        // get query params
        const {limit,page, minprice,maxprice,sortBy} = req.query


        const limitperPage = limit || 6
        const productSkip = limitperPage*(page-1)
        
        // sort by max and min price
        if(minprice && maxprice)  filterBy.discountPrice ={$gte:minprice,$lte:maxprice}

         // sort by category 
        if(filterProduct != 'all') filterBy.categoryId =filterProduct
        // sort from high to low or visversa
        if(sortBy=='lowtohigh') sortByPrice.discountPrice =1
        if(sortBy=='hightolow') sortByPrice.discountPrice =-1
        
        // display product from db
        const products = await productModel.find(filterBy).limit(limitperPage).skip(productSkip).sort(sortByPrice)


        // all ok
        res.status(200).json({products,limit:limitperPage,skip:productSkip,totalProduct:products.length})

    }catch(er){
      console.log(err)
        res.status(500).json(err)
  }
}

//  product review-------------------------------------------------------------------------
const productReview_Controller = async (req,res)=>{
try{
    // get data from client
      const {productId,review}=req.body
      
    //   filter by product id
      const existingProduct = await productModel.findById(productId)
      

    //   push review from client to db
      existingProduct.reviews.push(review)
    //   save new review
      existingProduct.save()

//   all ok
res.status(200).json('review submitted')
}catch(err){
    console.log(err)
    res.status(500).json(err)
}
}


// --exports -------------------------------------------------------------------------

module.exports ={
    addProduct_Controller,
    ProductStatus_Controller,
    deleteProduct_controller,
    dashboardproduct_Controller,
    publicdashboard_Controller,
    productReview_Controller,
}