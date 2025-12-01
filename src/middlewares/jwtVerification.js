// libaries
var jwt = require('jsonwebtoken');



// jwt verification
const jwtVerification =(req,res,next)=>{
    try{
        // get token from headers
      const token = req.headers.authorization
        // decode access token/jwt token
       const decoded = jwt.verify(token, process.env.jwt_secret);
        console.log(decoded)
        // creating user key with value as decode and adding it to req object
        req.user = decoded
        next()


        // all ok
      
    }catch(err){
        //   redirect
        res.status(307).send(err)
      
    }
}

// export
module.exports = jwtVerification