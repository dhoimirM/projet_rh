const mongoose = require('mongoose') // format du shema de la base de donné


const workerSchema = new mongoose.Schema({
    photo : {
        type: String,
    },
    name : {
        type: String,
        required: [true, 'Le champs nom est obligatoire']
    },
    prenom : {
        type: String,
        required: [true, 'Le champs prénom est obligatoire']
    },
    poste : {
        type: String,
        required: [true, 'Le champs poste est obligatoire']
    },
    blame : {
        type: Number,
        default: 0,
        required: [false]
    },
    companyId: {
        type: String,
        required:[true, "l'Id de l'entreprise est requis"]
    }
    
})

const workerModel = mongoose.model ('worker', workerSchema); //Cette constante aura la meme structure sur la base de donné mongodb

exports.workerModel = workerModel;