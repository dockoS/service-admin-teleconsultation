"use strict";

var mongoose = require('mongoose');

var uniqueValidator = require('mongoose-unique-validator');

var validateEmail = function validateEmail(email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

var medecinSchema = mongoose.Schema({
  prenom: {
    type: String,
    required: true
  },
  nom: {
    type: String,
    required: true
  },
  numTel: {
    type: String
  },
  password: {
    type: String
  },
  email: {
    type: String
  },
  createdAt: {
    type: Date,
    required: true,
    "default": new Date()
  },
  matricule: {
    type: String,
    required: true
  },
  etat: {
    type: Number,
    "default": 0
  }
});
medecinSchema.plugin(uniqueValidator);
module.exports = mongoose.model('medecins', medecinSchema);