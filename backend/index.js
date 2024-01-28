const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');



const app = express();
const corsOptions ={
    origin:'http://127.0.0.1:5173', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));
app.use(express.json())
app.use(bodyParser.urlencoded({extended:false}))


dotenv.config({path: "./config/.env"})
const connectDB = require('./config/db');
const port = process.env.PORT

connectDB();


const note = require("./routes/noteRoute")
app.use("/api/v1",note)

  




app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})