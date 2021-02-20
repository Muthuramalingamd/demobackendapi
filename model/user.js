var mongoose = require("mongoose");
var userSchema = new mongoose.Schema({
    name:{type:String},
    password:{type:String},
    email:{type:String},
    mobileno:{type:Number},
    profile_pic:{type:String}
})


module.exports = mongoose.model("testinguser",userSchema);