const User = require('../models/userModel')
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
exports.signUp = (async(req,res,next)=>{

    const {name,email,password} = req.body;

    const existingUser = await User.findOne({email: email})

    if(existingUser){
        return res.json({
          message:"User already exists"
        })
    }

    let hashedPassword;

    try{
     hashedPassword = await bcrypt.hash(password,12);
    }
    catch(err){
        console.log(err)
    }

    const user = await User.create({
        name,
        email,
        password:hashedPassword
    })

    try{
        await user.save();
    }
    catch(err){
        console.log(err)
    }

    res.status(201).json({
        user
    })
    
})

exports.logIn = async(req, res,next) => {
    
  const {email,password} = req.body;
  
  const existingUser = await User.findOne({email:email});

  if(!existingUser){
    res.status(400).json({
        message: 'User not found'
    })
  }

  let isValidUser;

 try{
     isValidUser = await bcrypt.compare(password,existingUser.password);

     if(!isValidUser){
       return res.status(401).json({
        message: "Invalid email or password"
       })
     }   

 }
 catch(err){
    console.log(err)
 }

 const token =  jwt.sign({id: existingUser._id},"key_is_secret",{
    expiresIn: "4h",
 })

// to clear with name res.clearCookie('65c1e00c0f4191e54ce830bd', { path: '/' });

 res.cookie("jwt",token,{
    path: "/",
    expires: new Date(Date.now()+3*60*55*1000),
    httpOnly: true,
    sameSite: "lax"
 });


 return res.status(200).json({
    status: "successfully logged in",
    user:existingUser,
    token,
 })


}


// exports.refreshToken = (req,res,next)=>{
    
//     const cookies = (req.cookies)
//     
//     const prevToken = cookies.jwt

//     console.log(cookies)
//     jwt.verify(String(prevToken),'key_is_secret',(err,user)=>{
//         if(err){
//             return res.status(400).json({
//                 message: "Invalid token"
//             })
//         }
//         res.clearCookie(`${user.id}`)
//         req.cookies[`${user.id}`] = ""

//         const token = jwt.sign({id: user.id},"key_is_secret",{
//                expiresIn: "35s"
//         })

//         res.cookie(String(user.id),token,{
//             path: "/",
//             expires: new Date(Date.now()+15*1000),
//             httpOnly: true,
//             sameSite: "lax"
//          });

//          req.id = user.id

//          next();
        
//     })


// }

exports.logOut = async(req,res,next)=>{
    const cookies = (req.cookies)
     const prevToken = cookies.jwt

    if (!prevToken) {
        return res.status(400).json({ message: "Couldn't find token" });
      }

    jwt.verify(String(prevToken),"key_is_secret",(err,user)=>{
        if (err) {
            console.log(err);
            return res.status(403).json({ message: "Authentication failed" });
          }
          res.clearCookie(`${user.id}`);
          req.cookies[`${user.id}`] = "";
          return res.status(200).json({ message: "Successfully Logged Out" });
    })
}