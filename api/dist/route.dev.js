"use strict";

var router = require('express').Router();

var adminCtrl = require("./controller");

var auth = require('../middleware/auth');

router.post('/admin/login', adminCtrl.login);
router.post('/admin/signup', adminCtrl.signup);
router.get('/admin/readOneMedecin/:matricule', adminCtrl.readOneMedecin);
router.get('/admin/readMedecins', adminCtrl.readMedecins);
router.post('/admin/createPatient/:id', adminCtrl.createPatient);
router.get('/admin/changerEtat/:_id/:etat', adminCtrl.changerEtat);
module.exports = router;