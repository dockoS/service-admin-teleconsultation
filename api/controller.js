var Joi = require('joi');
const Admin = require("../models/admin")
const bcrypt = require('bcrypt')
const mailer = require('../mail/mailer')
const Patient =require("../models/patient")
const Medecin =require("../models/medecin")
var jwt = require('jsonwebtoken')
var generator = require('generate-password');
const sendSms=require("../sms/sendSms")
function validateEmail(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};
var validatenumTel = function(numTel) {
    var re = /-?[0-9]+/;
    return re.test(numTel)
}
exports.signup = (req, res, next) => {
    const { numTel,email, prenom, nom,password,confirmPassword,matricule,nin } = req.body;
    if (email  && !validateEmail(email)) return res.status(400).send("ecrivez un email valide")
    if (numTel && !validatenumTel(numTel)) return res.status(400).send("numero invalide")
    if (password !== confirmPassword) return res.status(402).send("mots de password non identiques");
     
    Admin.findOne({ email }).then(isExist => {
        if (isExist) return res.status(400).send("Ce email existe dans la base de donnee");

        const adminValidation = {
            email: Joi.string()
                .email(),
            prenom: Joi.string()
                .min(2)
                .required(),
            nom: Joi.string()
                .min(2)
                .required(),
            password: Joi.string()
            .min(8)
            .max(30)
            .regex(/[a-zA-Z0-9]{3,30}/)
            .required(),
        confirmPassword: Joi.string()
            .min(8)
            .max(30)
            .regex(/[a-zA-Z0-9]{3,30}/)
            .required(),
            numTel:Joi
            .string(),
            nin:Joi
            .string()
            .required()
        };
        if (Joi.validate(req.body, adminValidation).error) return res.status(402).send(Joi.validate(req.body, adminValidation).error.details[0].message);
        bcrypt
        .hash(password, 10)
        .then(password => {
            console.log("docko")
            const admin = new Admin({ prenom, nom, email, password,numTel ,nin});
                admin
                    .save()
                    .then(() => {
                        admin.password=null
                        res.send(admin);
                    })
                    .catch(error => res.status(500).send(error));
        })
        .catch(error => res.status(500).send(error))
    });
};


exports.login = (req, res, next) => {
    const { email,password } = req.body
    Admin.findOne({email})
    .then(admin => {
            if (!admin) return res.status(402).send("email ou password incorrect 😢😢😢😢")
            bcrypt
            .compare(password, admin.password)
            .then(valid => {
                if (!valid) return res.status(402).send("matricule ou password incorrect 😢😢😢😢")
                admin.password=undefined
                const token = jwt.sign({idadmin:admin._id,prenom:admin.prenom,nom:admin.nom,matricule:admin.matricule}, "RANDOM_TOKEN_SECRET", {
                    expiresIn: "24h"
                });
                console.log(token); 

                    res.send({admin,token:token})
                })
                .catch(error => res.status(400).send(error))
            })
            .catch(error => res.status(500).send(error))
        };
exports.read = (req, res, next) => {
            admin.find({}, (err, foundData) => {
                if (err) return res.status(500).send(err)
                res.send(foundData);
            });
        };
exports.readMedecins = (req, res, next) => {
            Medecin.find({}, (err, foundData) => {
                if (err) return res.status(500).send(err)
                res.send(foundData);
            });
        };
exports.readOneMedecin = (req, res, next) => {
            var id = req.params.id
            Medecin.findOne({ id }, (err, foundObject) => {
                if (err) return res.status(500).send(err)
                res.send(foundObject)
            })
        }
        

exports.changerEtat=(req,res,next)=>{
    const {_id,etat}=req.params
    Medecin.findOne({_id},(err,foundObject)=>{
        if (err) return res.status(500).send(err);
        if(etat) foundObject.etat=etat
        foundObject
            .save()
            .then(async () =>{ 
                if(foundObject.etat===-1){
                    Medecin.findOneAndDelete({ _id: foundObject._id }, (err, object) => {
                        //if (err) return res.status(500).json({ error: error });
                        console.log("deleted");
                        res.status(200).send(object)
                    })
                  }else{
                  res.send(foundObject)
                  }
            })
            .catch(error => res.status(500).send(error))
    })
}     
exports.readByEtat = (req, res, next) => {
    const{etat}=req.params
    Medecin.find({etat}, (err, foundData) => {
        if (err) return res.status(500).send(err)
        res.send(foundData);
    });
};
exports.update = (req, res, next) => {
    const { id } = req.params;
    const { prenom, nom, email, numTel,matricule } = req.body
    Admin.findOne({ _id: id }, (err, foundObject) => {
        if (err) return res.status(500).send(err);
        if (email && !validateEmail(email)) return res.status(400).send("ecrivez un email valide")
        if (prenom) foundObject.prenom = prenom;
        if (nom) foundObject.nom = nom;
        if (email) foundObject.email = email;
        if (numTel) foundObject.numTel = numTel;
        if (email) foundObject.email = email;
        foundObject
            .save()
            .then(() => res.send(foundObject))
            .catch(error => res.status(500).send(error))
    });
};
exports.delete = (req, res, next) => {
    var id = req.params.id;
    Admin.findOneAndDelete({ _id: id }, (err, object) => {
        if (err) return res.status(500).json({ error: error });
        res.status(200).send(object)
    })
}
exports.createPatient=(req,res,next)=>{
    var {id}=req.params
    admin.findOne({_id:id})
    .then(isExist => {
        if (!isExist) return res.status(400).send("Ce admin n'existe pas dans la base de donnee")
    var {age,numTel,prenom,nom,matricule,dateNaiss,taille,situationMatrimoniale,nbrEnfants,statutProfessionnel,MaladiesAuparavant,groupeSanguin}=req.body
    if (numTel && !validatenumTel(numTel)) return res.status(400).send("numero invalide")
    var password = generator.generate({
        length: 10,
        numbers: true
    });
    Patient.findOne({matricule})
    .then(isExist => {
        if (isExist) return res.status(400).send("Ce matricule existe dans la base de donnee")
        const patientValidation = {
            age: Joi.number(),
            prenom: Joi.string()
            .min(2)
            .required(),
            nom: Joi.string()
            .min(2)
            .required(),
            matricule: Joi
            .string()
            .required(),
            numTel:Joi
            .string()
            ,
            taille:Joi
            .string(),
            situationMatrimoniale:Joi
            .string(),
            nbrEnfants:Joi
            .string(),
            statutProfessionnel:Joi
            .string(),
            MaladiesAuparavant:Joi
            .string(),
            groupeSanguin:Joi
            .string(),
            dateNaiss:Joi
            .date()
        };
        if (Joi.validate(req.body, patientValidation).error) return res.status(402).send(Joi.validate(req.body, patientValidation).error.details[0].message);
        var createBy=id
        passwordDecrypte=password
        bcrypt
        .hash(password, 10)
        .then(password => {

            var patient=new Patient({age,createBy,password,numTel,prenom,nom,matricule,dateNaiss,taille,situationMatrimoniale,nbrEnfants,statutProfessionnel,MaladiesAuparavant,groupeSanguin})
            patient.save()
            .then((object)=>{                
                
                sendSms("+15864745522",numTel,passwordDecrypte)
                res.send(object)
            }).catch((err)=> {return res.status(500).send(err)})
        }).catch((err)=> {return res.status(500).send(err)})
    })
    .catch((err)=> {return res.status(500).send(err)})
})
.catch((err)=> {return res.status(500).send(err)})
}