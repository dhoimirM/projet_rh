const express = require("express"); //Ca permet d'appeler la bibliotheque express ca facilite l'intégration des données
const session = require("express-session");//permet de pouvoir se connecteer et ouvrir une connexion quand on fait des login
const mongoose = require("mongoose");// Mongoose est le lien entre mongoDB et le serveur
const companyRouter = require("./Routes/companyRouter");
const workerRouter = require ("./Routes/workerRouter");
require("dotenv").config()// Caché les données et aussi creer des exception lors du transfert de donnée de github

const db = process.env.BDD_URL //Création du cryptage 

const app = express()

app.use(session({secret: 'pass', saveUninitialized: true, resave: true}))
app.use(express.static("./assets"))// Permet d'afficher tout ce qui est dans asset
app.use(express.urlencoded({extended: true})) //on encode notre formulaire et grace à cettte ligne on va le désencodé
app.use(express.json())//Si on veut lire du json
app.use(companyRouter)// On utilise le routeur compagny router
app.use(workerRouter)

app.listen(3001, (err)=>{ //Ecoute sur le port 3000 du server
    if (err){ //Si erreur log moi l'eereur
        console.log(err);
    }else{
        console.log("Vous etes connecté");
    }
})

mongoose.set('strictQuery', true); //Ce bloc la permet de savoir si la base de donnée est bien connecté le true fait que le model soit strictement egale à ce qu'on ecrit
mongoose.connect(db,(err)=>{
    if (err) {
        console.log(err);
    }else{
        console.log("base de donné opérationelle");
    }
})