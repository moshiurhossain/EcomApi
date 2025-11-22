// libaries
const { emailRegex, passwordRegex } = require("../helpers/Regex")
const authModel = require("../models/authModel")


// registration controller 
const register_Controller = async (req,res)=>{
    try{
        // get data from frontend
          const {
             userName,
             email,
             password,
             phone,
             address
          } = req.body

        // check validation  
  if(!userName || !email || !password || !phone || !address ) return res.status(404).send(`Need to provide required information`)
    //    email regex
// if(!emailRegex.test(email)) return res.status(404).send(`not a valid email`)
//     //    password regex
// if(!passwordRegex.test(password)) return res.status(404).send(`weak password`)


    // save to db
    await new authModel({
            userName,
             email,
             password,
             phone,
             address
    }).save()
        // all ok
        res.status(200).send(`Registered Successfully`)
    }catch(err){
      res.status(500).send(`${err}`)
    }
}


// login controller 
const login_Controller = async (req,res)=>{
    try{
        // get data from frontend
        //   const {
        //      userName,
        //      email,
        //      password,
        //      phone,
        //      address
        //   } = req.body


        // all ok
        res.status(200).send(`Registered Successfully`)
    }catch(err){
      res.status(500).send(`${err}`)
    }
}

// all exports
module.exports = {
    register_Controller,
    login_Controller
}