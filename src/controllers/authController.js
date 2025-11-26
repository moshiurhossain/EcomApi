// libaries
const { generateOTP, otpExpiryTime } = require("../helpers/allGenerators")
const otpTemplate = require("../helpers/otpTemplete")
const { emailRegex, passwordRegex } = require("../helpers/Regex")
const sendMail = require("../helpers/sendMail")
const bcrypt = require('bcrypt');
const authModel = require("../models/authModel")
const jwt = require('jsonwebtoken');
const cloudinary=require('cloudinary')

   // Cloudinary Configuration 
    cloudinary.config({ 
        cloud_name: 'doguuil48', 
        api_key: '835279789187353', 
        api_secret: '<your_api_secret>' // Click 'View API Keys' above to copy your API secret
    });



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
if(!emailRegex.test(email)) return res.status(404).send(`not a valid email`)
//  check password length
if(password.length < 7) return res.status(404).send(`password shoud be more then 7 letters`)
//     //    password regex
// if(!passwordRegex.test(password)) return res.status(404).send(`weak password`)

// check for existing user email
const existingEmail = await authModel.findOne({email})
if ( existingEmail) return res.status(401).send(`User already exists. Try different email`)

// generate otp
const otp = generateOTP()

// send mail
sendMail(email,'Otp verification', otpTemplate(userName,otp))

// encrypt password
const hashPass = await bcrypt.hash(password,10)

// otp expiretime
console.log(otpExpiryTime())

    // save to db
    await new authModel({
            userName,
             email,
             password:hashPass,
             phone,
             address,
             otp,
             expireOtpTime:otpExpiryTime(),
    }).save()
        // all ok
        res.status(200).send(`Registered Successfully`)
    }catch(err){
      res.status(500).send(`${err}`)
    }
}

// verify otp controller

const verifyOtp_Controller = async (req,res)=>{
    try{
          //  get otp
          const {otp} = req.body
          // check for empty otp field  
          if(!otp) return res.status(401).send(`otp is required`)
          //  check for existing otp
          const existingOtp = await authModel.findOne({otp})
          //  check if otp is existing
          if(!existingOtp) return res.status(401).send(`otp is not found`)
          // check current time
        const currentTime = new Date(Date.now())
        //  check otp expire time
        if( currentTime >existingOtp.expireOtpTime)
          return res.status(401).send(`otp time has expired`)
      
          // change existingotp data status
          existingOtp.expireOtpTime = null
          existingOtp.otp = null
          existingOtp.isVerified = true

          // save changed data to db
          await existingOtp.save()
            // all ok
             res.status(200).send(`verify otp`)

        

       
    }catch(err){
      res.status(500).send(`${err}`)
    }
}

// login controller 
const resendOtp_Controller = async (req,res)=>{
    try{
          // get data from frontend
          const { email} = req.body
          // check email regex
          if(!emailRegex.test(email)) return res.status(404).send(`not a valid email`)  
           
          const existingUser = await authModel.findOne({email})
          // check existing user 
          if(!existingUser) return res.status(404).send(`email not found`)  

          // send new otp and set new expire date
          const otp = generateOTP()
          const expireOtpTime =  otpExpiryTime()
          //  set new otp and expire time to db value
          existingUser.otp = otp
          existingUser.expireOtpTime =expireOtpTime
          // save new values to db
          await existingUser.save()
          // sebd email via otp
          sendMail(email,'Resend otp', otpTemplate(existingUser.userName,otp))

  


        // all ok
        res.status(200).send(`Otp resent`)
    }catch(err){
      res.status(500).send(`${err}`)
    }
}

// login controller 
const login_Controller = async (req,res)=>{
    try{
        // get data from frontend
          const { email, password } = req.body
          // ------------------------ user validation start --------------------- //
          // check email regex
          if(!emailRegex.test(email)) return res.status(404).send(`not a valid email`)  

          if(!password)  return res.status(404).send(`must enter password`) 
          // //    password regex
          // if(!passwordRegex.test(password)) return res.status(404).send(`weak password`)


            // check user in db
            const existingUser = await authModel.findOne({email})
            // if not found
            if(!existingUser) return res.status(404).send(`user not found`)  
            //  match password 
            const match = await bcrypt.compare(password,existingUser.password)
            // if password dont match
            if(!match) return res.status(404).send(`wrong credential`)  
            // if user email is not verified
            if(!existingUser.isVerified) return res.status(404).send(`email: ${email} not verifed  `)  
            // ------------------------ user validation ends --------------------- //
            
            // ------------------------ generate jwt token --------------------- //

           const token =  jwt.sign(
                      {
                        email: existingUser.email,
                        userRole: existingUser.userRole,
                      }, process.env.jwt_Secret, 
                      {
                        expiresIn: '1h' 
                      }
                     );
                     // ------------------------ generate jwt token ends--------------------- //
        // ----------- select data for frontend
        const userInfo ={
          userName:existingUser.userName,
          avatar:existingUser.avatar,
          email:existingUser.email,
          phone:existingUser.phone,
          address:existingUser.address,
          role:existingUser.userRole,
          verified:existingUser.isVerified,
          id:existingUser.id,
        }


        // all ok
        res.status(200).send({userInfo:userInfo , accessToken:token})
    }catch(err){
      res.status(500).send(`${err}`)
    }
}

// update profile controller
const updateProfile_Controller = async (req,res)=>{
    try{    
            // get data from frontend
            const {email,userName,phone,address,avatar} = req.body
          //  check existing user
          const existingUser = await authModel.findOne({email})

          // update username,phone,address if value is given
          if(userName) existingUser.userName = userName
          if(phone) existingUser.phone = phone
          if(address) existingUser.address = address
          // change avatar
          if(avatar){
                // Upload an image
     const uploadResult = await cloudinary.uploader
       .upload(
           req.file.path, {
               public_id: `Img:${new Date(Date.now())}`,
           }
       )
       .catch((error) => {
           console.log(error);
       });
        // ------------
        console.log(uploadResult)
            }

          // save updated value to db
        

            

      // all ok
      res.status(200).send(`updated`)

    }catch(err){
     res.status(500).send(`${err}`)
    }
}




// all exports
module.exports = {
    register_Controller,
    login_Controller,
    verifyOtp_Controller,
    resendOtp_Controller,
    updateProfile_Controller,
}