const mongoose = require('mongoose') // format du shema de la base de donné


const companySchema = new mongoose.Schema({
    name : {
        type: String,
        required: [true, 'Le champs nom est obligatoire']
    },
    siret : {
        type: Number,
        required: [true, 'Le champs prénom est obligatoire']
    },
    mail : {
        type: String,
        required: [true, 'Le champs mail est obligatoire']
    },
    director : {
        type: String,
        required: [true, 'Le champs nom est obligatoire']
    },
    password : {
        type: String,
        required: [true, 'Le champs mot de passe est obligatoire']
    },
    workers:{
        type:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:"workers"
        }]
    }
})

const companyModel = mongoose.model ('company', companySchema); // creer modele de donnes 

exports.companyModel = companyModel;