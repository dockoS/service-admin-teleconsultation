"use strict";

var Joi = require('joi');

var Admin = require("../models/admin");

var bcrypt = require('bcrypt');

var mailer = require('../mail/mailer');

var Patient = require("../models/patient");

var Medecin = require("../models/medecin");

var jwt = require('jsonwebtoken');

var generator = require('generate-password');

var sendSms = require("../sms/sendSms");

function validateEmail(email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
}

;

var validatenumTel = function validatenumTel(numTel) {
  var re = /-?[0-9]+/;
  return re.test(numTel);
};

exports.signup = function (req, res, next) {
  var _req$body = req.body,
      numTel = _req$body.numTel,
      email = _req$body.email,
      prenom = _req$body.prenom,
      nom = _req$body.nom,
      password = _req$body.password,
      confirmPassword = _req$body.confirmPassword,
      matricule = _req$body.matricule,
      nin = _req$body.nin;
  if (email && !validateEmail(email)) return res.status(400).send("ecrivez un email valide");
  if (numTel && !validatenumTel(numTel)) return res.status(400).send("numero invalide");
  if (password !== confirmPassword) return res.status(402).send("mots de password non identiques");
  Admin.findOne({
    email: email
  }).then(function (isExist) {
    if (isExist) return res.status(400).send("Ce email existe dans la base de donnee");
    var adminValidation = {
      email: Joi.string().email(),
      prenom: Joi.string().min(2).required(),
      nom: Joi.string().min(2).required(),
      password: Joi.string().min(8).max(30).regex(/[a-zA-Z0-9]{3,30}/).required(),
      confirmPassword: Joi.string().min(8).max(30).regex(/[a-zA-Z0-9]{3,30}/).required(),
      numTel: Joi.string(),
      nin: Joi.string().required()
    };
    if (Joi.validate(req.body, adminValidation).error) return res.status(402).send(Joi.validate(req.body, adminValidation).error.details[0].message);
    bcrypt.hash(password, 10).then(function (password) {
      console.log("docko");
      var admin = new Admin({
        prenom: prenom,
        nom: nom,
        email: email,
        password: password,
        numTel: numTel,
        nin: nin
      });
      admin.save().then(function () {
        admin.password = null;
        res.send(admin);
      })["catch"](function (error) {
        return res.status(500).send(error);
      });
    })["catch"](function (error) {
      return res.status(500).send(error);
    });
  });
};

exports.login = function (req, res, next) {
  var _req$body2 = req.body,
      email = _req$body2.email,
      password = _req$body2.password;
  Admin.findOne({
    email: email
  }).then(function (admin) {
    if (!admin) return res.status(402).send("email ou password incorrect 😢😢😢😢");
    bcrypt.compare(password, admin.password).then(function (valid) {
      if (!valid) return res.status(402).send("matricule ou password incorrect 😢😢😢😢");
      admin.password = undefined;
      var token = jwt.sign({
        idadmin: admin._id,
        prenom: admin.prenom,
        nom: admin.nom,
        matricule: admin.matricule
      }, "RANDOM_TOKEN_SECRET", {
        expiresIn: "24h"
      });
      console.log(token);
      res.send({
        admin: admin,
        token: token
      });
    })["catch"](function (error) {
      return res.status(400).send(error);
    });
  })["catch"](function (error) {
    return res.status(500).send(error);
  });
};

exports.read = function (req, res, next) {
  admin.find({}, function (err, foundData) {
    if (err) return res.status(500).send(err);
    res.send(foundData);
  });
};

exports.readMedecins = function (req, res, next) {
  Medecin.find({}, function (err, foundData) {
    if (err) return res.status(500).send(err);
    res.send(foundData);
  });
};

exports.readOneMedecin = function (req, res, next) {
  var id = req.params.id;
  Medecin.findOne({
    id: id
  }, function (err, foundObject) {
    if (err) return res.status(500).send(err);
    res.send(foundObject);
  });
};

exports.changerEtat = function (req, res, next) {
  var _req$params = req.params,
      _id = _req$params._id,
      etat = _req$params.etat;
  Admin.findOne({
    _id: _id
  }, function (err, foundObject) {
    if (err) return res.status(500).send(err);
    console.log(foundObject);
  });
};

exports.update = function (req, res, next) {
  var id = req.params.id;
  var _req$body3 = req.body,
      prenom = _req$body3.prenom,
      nom = _req$body3.nom,
      email = _req$body3.email,
      numTel = _req$body3.numTel,
      matricule = _req$body3.matricule;
  Admin.findOne({
    _id: id
  }, function (err, foundObject) {
    if (err) return res.status(500).send(err);
    if (email && !validateEmail(email)) return res.status(400).send("ecrivez un email valide");
    if (prenom) foundObject.prenom = prenom;
    if (nom) foundObject.nom = nom;
    if (email) foundObject.email = email;
    if (numTel) foundObject.numTel = numTel;
    if (email) foundObject.email = email;
    foundObject.save().then(function () {
      return res.send(foundObject);
    })["catch"](function (error) {
      return res.status(500).send(error);
    });
  });
};

exports["delete"] = function (req, res, next) {
  var id = req.params.id;
  Admin.findOneAndDelete({
    _id: id
  }, function (err, object) {
    if (err) return res.status(500).json({
      error: error
    });
    res.status(200).send(object);
  });
};

exports.createPatient = function (req, res, next) {
  var id = req.params.id;
  admin.findOne({
    _id: id
  }).then(function (isExist) {
    if (!isExist) return res.status(400).send("Ce admin n'existe pas dans la base de donnee");
    var _req$body4 = req.body,
        age = _req$body4.age,
        numTel = _req$body4.numTel,
        prenom = _req$body4.prenom,
        nom = _req$body4.nom,
        matricule = _req$body4.matricule,
        dateNaiss = _req$body4.dateNaiss,
        taille = _req$body4.taille,
        situationMatrimoniale = _req$body4.situationMatrimoniale,
        nbrEnfants = _req$body4.nbrEnfants,
        statutProfessionnel = _req$body4.statutProfessionnel,
        MaladiesAuparavant = _req$body4.MaladiesAuparavant,
        groupeSanguin = _req$body4.groupeSanguin;
    if (numTel && !validatenumTel(numTel)) return res.status(400).send("numero invalide");
    var password = generator.generate({
      length: 10,
      numbers: true
    });
    Patient.findOne({
      matricule: matricule
    }).then(function (isExist) {
      if (isExist) return res.status(400).send("Ce matricule existe dans la base de donnee");
      var patientValidation = {
        age: Joi.number(),
        prenom: Joi.string().min(2).required(),
        nom: Joi.string().min(2).required(),
        matricule: Joi.string().required(),
        numTel: Joi.string(),
        taille: Joi.string(),
        situationMatrimoniale: Joi.string(),
        nbrEnfants: Joi.string(),
        statutProfessionnel: Joi.string(),
        MaladiesAuparavant: Joi.string(),
        groupeSanguin: Joi.string(),
        dateNaiss: Joi.date()
      };
      if (Joi.validate(req.body, patientValidation).error) return res.status(402).send(Joi.validate(req.body, patientValidation).error.details[0].message);
      var createBy = id;
      passwordDecrypte = password;
      bcrypt.hash(password, 10).then(function (password) {
        var patient = new Patient({
          age: age,
          createBy: createBy,
          password: password,
          numTel: numTel,
          prenom: prenom,
          nom: nom,
          matricule: matricule,
          dateNaiss: dateNaiss,
          taille: taille,
          situationMatrimoniale: situationMatrimoniale,
          nbrEnfants: nbrEnfants,
          statutProfessionnel: statutProfessionnel,
          MaladiesAuparavant: MaladiesAuparavant,
          groupeSanguin: groupeSanguin
        });
        patient.save().then(function (object) {
          sendSms("+15864745522", numTel, passwordDecrypte);
          res.send(object);
        })["catch"](function (err) {
          return res.status(500).send(err);
        });
      })["catch"](function (err) {
        return res.status(500).send(err);
      });
    })["catch"](function (err) {
      return res.status(500).send(err);
    });
  })["catch"](function (err) {
    return res.status(500).send(err);
  });
};