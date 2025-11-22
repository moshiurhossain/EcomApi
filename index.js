// libaries
const express = require('express')
const cors = require('cors')
const route = require('./src/routes/routes')
const mongoose = require('mongoose')
const app = express()
const port = 8000
// dot env config
require('dotenv').config();

//  middleware
app.use(express.json())
app.use(cors())
// connect middleware route
app.use(route)


// db connection
mongoose.connect(process.env.db_Link)
.then(()=>{console.log(`db connected`)})
.catch((err)=>{console.log(err)})





// run server port
app.listen(port,()=>{
    console.log(`this server is running at Port: ${port}`)
})