const mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator');
var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const patientSchema = mongoose.Schema({
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
        required:true
    },

    matricule: {
        type: String
    },

    password: {
        type: String
    },
    dateNaiss:{
        type:Date
    },

    taille:{
        type:String
    },

    situationMatrimoniale:{
        type:String
    },

    nbreEnfants:{
        type:Number
    },

    statutProfessionnel:{
        type:String
    },

    MaladiesAuParavant:{
        type:String
    },

    groupeSanguin:{
        type:String
    },

    createdAt: {
        type: Date,
        required: true,
        default: new Date()
    },
    matricule:{
        type:String,
        required:true
    },
    createBy:{
        type:String,
        required:true
    },
    age:{
        type:String
    }
})

patientSchema.plugin(uniqueValidator)
module.exports = mongoose.model('patients', patientSchema)