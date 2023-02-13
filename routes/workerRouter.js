const { companyModel } = require("../models/companyModel");
const { workerModel } = require("../models/workerModel");
const authGuard = require("../service/authguard");
const upload = require('../service/multer')
const  workerRouter  = require("express").Router();

workerRouter.get("/workerRegister", authGuard, async (req, res) => {
    res.render("workerRegister.twig"); 
});


workerRouter.post("/workerRegister",authGuard, upload.single("photo"), async (req, res) => {
    if(req.file){
        req.body.photo=req.file.filename

    }
    req.body.companyId = req.session.companyId
    let worker = new workerModel (req.body)
    worker.save();
    
    res.redirect("/workerView"); 
});

workerRouter.get("/workerDelete/:id", authGuard, async (req, res) => {
    try {
        await workerModel.deleteOne({_id: req.params.id }) 
        //Le await permet de temporiser l'exécution de la fonction deletone, 
        //Dans le workerModel supprime moi (dans l'_id qui a comme paramètre id )
        res.redirect("/workerView"); 
    } catch (error) {
        console.log(error);
        res.send(error);
    }
});

workerRouter.get("/workerBlame/:id", authGuard, async (req, res)=>{
    try {
        let employee = await workerModel.findOne({_id: req.params.id})// on creer une variable qui va chercher dans le model l'id
        employee.blame++ //blame++ permet d'ajouter 1 à chaque fois
        if (employee.blame >= 3) {//Si le blame de l'employé est supérieur ou egale à 3
            res.redirect("/workerDelete/" +  req.params.id )//redirige moi vers la route pour supprimer un utilisateur
        }else{
            await workerModel.updateOne(({_id: req.params.id }), employee)// sinon modifie mon utilisateur
            res.redirect("/workerView"); //et redirige moi vers la route workerview
        }
    } catch (error) {
        console.log(error);
        res.send(error);
    }

})

workerRouter.get("/workerUpdate/:id", authGuard, async (req, res)=>{
    let worker = await workerModel.findById(req.params.id)
    res.render("workerUpdate.twig",{
        worker: worker
    });
})

workerRouter.post("/workerUpdate/:id", upload.single("photo"), authGuard, async (req, res)=>{
    try {
        await workerModel.updateOne(({_id: req.params.id}), req.body)
        res.redirect("/workerView");
    } catch (error) {
        console.log(error);
        res.send(error);
    }
})




module.exports = workerRouter

