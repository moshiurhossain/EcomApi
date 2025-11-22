// libaries

// registration controller 
const register_Controller = async (req,res)=>{
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

module.exports = {register_Controller}