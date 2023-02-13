const { companyModel } = require("../models/companyModel")

let authGuard = async (req, res, next)=>{ // le authguard va permettre de sécuriser ma route et l'authentifié
    const company = await companyModel.findById(req.session.companyId)// N'exécute pas ce code tant que l'id n'a pas été comparé avec la base de donné
   
    if (company) { // Si l'authentification est valide 
        req.session.companyName = company.name
        next() // Joue moi le code qui se trouve dans la route workerView donc la page s'affichera
    }else{
        console.log("deconnexion");
        res.redirect('/connexion') // sinon, le authguard permettra de me rediriger vers la page "connexion" si mon id ne correpond pas. 
    }
}

module.exports = authGuard