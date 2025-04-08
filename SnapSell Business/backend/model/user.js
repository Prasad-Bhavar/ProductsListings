const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },
    password:{
        type:String,
        required:true,
        minlenght:[5,'password must be atleast 5 character'],
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,

    },
})



const UserModel = new mongoose.model('user',UserSchema);
module.exports = UserModel;