import fs from "fs";

import path from "path";

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url)

const __dirname = path.dirname(__filename);


export const register = (req,res)=>{

const {fullName,email,password} = req.body;

if(!fullName||!email||!password){
    return res.status(404).json({
        success:false,
        message:"All fields are required..."
    })
}

const USER_FILE =  path.join(__dirname,"../data/user.json");

if(!fs.existsSync(USER_FILE)){

fs.writeFileSync(USER_FILE,JSON.stringify([]));


}

const newEntry = {
    id:Date.now().toString(),
    fullName,
    email,
    password
   
}
const users = JSON.parse(fs.readFileSync(USER_FILE,"utf-8"));

const verifyUser  = users.find(user=>user.email===email)
if(verifyUser){
    
   return res.status(404).json({
    success:false,
    message:"Users Already Exists , please login"
   })
}

users.push(newEntry);

fs.writeFileSync(USER_FILE,JSON.stringify(users));

return res.status(200).json({
    success:true,
    message:"Sucessfully Registered"
});


}

export const login = (req,res)=>{

const {email,password} = req.body;

if(!email||!password){
    return res.status(404).json({
        success:false,
        message:"All fields are required"
    })
}
const USER_FILE = path.join(__dirname,"../data/user.json");

const users= JSON.parse(fs.readFileSync(USER_FILE,"utf-8"))
const verifyUser = users.find(user=>user.email===email);

if (!verifyUser) {
    return res.status(404).json({
        success: false,
        message: "User not found",
    });
}
if(verifyUser.password !== password){
    return res.status(404).json({
        success:false,
        message:"Password Wrong , Please try again"
    })
}

return res.status(200).json({
    success:true,
    message:"Logged In"
})



}

export const logout = (req,res)=>{
return res.status(200).json({
    success:true,
    message:"Logged out"
})
}
