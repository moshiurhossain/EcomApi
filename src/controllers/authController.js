// libaries
const { generateOTP, otpExpiryTime } = require("../helpers/allGenerators")
const otpTemplate = require("../helpers/otpTemplete")
const { emailRegex, passwordRegex } = require("../helpers/Regex")
const sendMail = require("../helpers/sendMail")
const bcrypt = require('bcrypt');
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


        // all ok
        res.status(200).send(`Registered Successfully`)
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
}