const mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator');
var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const adminSchema = mongoose.Schema({
    prenom:{
        type :String,
        required:true
    },
    nom:{
        type:String,
        required:true
    },
    numTel: {
        type: String,
    },
    password: {
        type: String
    },
    email:{
        type:String
    },
    createdAt: {
        type: Date,
        required: true,
        default: new Date()
    },
    nin:{
        type:String,
        required:true
    }
})

adminSchema.plugin(uniqueValidator)
module.exports = mongoose.model('admins', adminSchema)