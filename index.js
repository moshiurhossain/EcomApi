// libaries
const express = require('express')
const cors = require('cors')
const route = require('./src/routes/routes')
const app = express()
const port = 8000
// dot env config
require('dotenv').config();

//  middleware
app.use(express.json())
app.use(cors())
// connect middleware route
app.use(route)




// run server port
app.listen(port,()=>{
    console.log(`this server is running at Port: ${port}`)
})