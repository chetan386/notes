const jwt = require("jsonwebtoken")
 exports.verify = async(req,res,next)=>{
try{
    const cookies = (req.cookies)
    const token = (cookies.jwt)
    
if(!token){
    return res.status(400).json({
        message: "Token not found"
    })
}
jwt.verify(String(token),"key_is_secret",(err,user)=>{
    if(err){
        return res.json({
            message: "Invalid token"
        })
    }
    req.id = user.id
   
    next();
})

}catch(e){
    return res.status(401).json({
        message: "Token expired"
    })
}

}
//  CAN ADD THIS FUNCTION IF WANT TO GET USER DETAILS 
// exports.getUser = async(req,res,next)=>{
// const userId = req.id; 
// let user;

// try{
// user = await User.findById(userId,"-password")
// }catch(err){
// return res.status(400).json({
//     message: err
// })
// }
// if(!user){
// return res.status(400).json({
//     message: "User not found"
// })
// }

// res.status(200).json({
// user
// })
// }