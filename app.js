const express = require('express')
const app = express()
require('dotenv/config')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const adminRoutes = require('./api/route')
const cors=require("cors")

const config = require('config')
//Fonction qui permet de se connecter a mongo avec des parametres
const connectToMongo = (parameters, environment) => {
    mongoose.connect(parameters, { useNewUrlParser: true, useCreateIndex: true,useUnifiedTopology: true })
        .then(() => {
            if (config.get('tag') !== 'test') console.log(`Connected to MongoDB -- ${environment}`)
        })
        .catch((error) => {
            if (config.get('tag') !== 'test') console.log(`Not connected to MongoDB -- ${environment}`, error)
        })
}

//Fonction permettant de demarrer MongoDB selon le fait qu'on soit en dev, en prod ou en test
const startMongoDB = () => {
    const tag = config.get('tag')
    if (tag === 'test') return (() => {
        connectToMongo(process.env.MONGO_TEST_PARAMS, tag)
    })()

    connectToMongo(config.get(`db.${tag}-params`), tag)
}

//Demarrage de le bdd
startMongoDB()

//Parametrage des Headers
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});
adminRoutes.use(cors())
app.use(bodyParser.json())
app.use("/", adminRoutes)

module.exports = app;
