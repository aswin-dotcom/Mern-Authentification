const mongoose=require('mongoose');
const UserSchema = new mongoose.Schema({
    Username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    DOB:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
    })
module.exports=mongoose.model('Register',UserSchema);
