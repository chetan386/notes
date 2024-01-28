const mongoose = require('mongoose')
const URI = process.env.URI
console.log(URI)

const connectDB = ()=>{ mongoose.connect(URI,{useNewUrlParser: true, useUnifiedTopology:true}).then(()=>{
    console.log(`database is connected on port ${URI}`)
}).catch((err)=>{
    console.log(err)
})
}


module.exports = connectDB
