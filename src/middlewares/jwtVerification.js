
// jwt verification
const jwtVerification =(req,res,next)=>{
    try{
        // get token from headers
        const {token}=req.headers

        // all ok
        res.status(200).send(`token verified ${token}`)
    }catch(err){
        res.status(500).send(err)
    }
}

// export
module.exports = jwtVerification