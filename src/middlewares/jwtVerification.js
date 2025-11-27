// libaries
var jwt = require('jsonwebtoken');



// jwt verification
const jwtVerification =(req,res,next)=>{
    try{
        // get token from headers
      const token = req.headers.authorization
        // decode access token/jwt token
       const decoded = jwt.verify(token, process.env.jwt_secret);
        req.user = decoded
        // send to next if decoded
        next()


        // all ok
        res.status(200).send(`token verified ${token}`)
    }catch(err){
        //   redirect
        res.status(307).send(`token expired : ${err}`)
      
    }
}

// export
module.exports = jwtVerification