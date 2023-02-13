const { companyModel } = require("../models/companyModel");
const { workerModel } = require("../models/workerModel");
const  companyRouter  = require("express").Router(); // Constante pour créer un routeur qui a pour nom projectRouter
const authGuard = require("../service/authguard")
const crypto = require('../service/crypto')



companyRouter.get("/", async (req, res) => {
  res.render("main.twig"); //res ca veut dire renvoie au navigateur. render veut dire affiche moi la page "main.twig"
});

//---------------------------Page Formulaire d'inscription-------------------------------------------------

companyRouter.get("/register", async (req, res) => {
  res.render("register.twig"); //res ca veut dire renvoie au navigateur. render veut dire affiche moi la page "register.twig"
});

companyRouter.post("/register", async (req, res) => {
  // Nous permet d'envoyer les données une fois les champs remplis
req.body.password = await crypto.cryptPassword(req.body.password)
  let company = new companyModel(req.body); // Variable company, elle permet de vérifier si c'est conforme au patrons$
  company.save(); //Permet de sauvergarder nos données entrer
  res.redirect("/connexion"); //Cela va nous rediriger vers la page de connexion
});

//---------------------------Page Connexion des entreprises-------------------------------------------------

companyRouter.get("/connexion", async (req, res) => {
  res.render("connexion.twig"); //res ca veut dire renvoie au navigateur. render veut dire affiche moi la page "connexion.twig"
});

companyRouter.post("/connexion", async (req, res) => {
  // fonction qui servira à me connecter
try {
    let company = await companyModel.findOne({ mail: req.body.mail }); // ici il va récupérer le mail dans la bdd
   if (
      company &&
      (await crypto.comparePassword(req.body.password, company.password))
   ) {
      // là il va comparer le mot de passe de la bdd
      req.session.companyId = company._id;
      res.redirect("/workerView");
   }else{
      res.redirect('/connexion')
   }
} catch (error) {
   console.log(error);
   res.send(error);
}
});

companyRouter.get("/workerView", authGuard, async (req, res)=>{
   //sur cette route=> le authguard fera que, si je suis bien logué le reste du code s'executera
   let workers =  await workerModel.find({companyId: req.session.companyId})
   res.render('workerView.twig',{ // je suis bien authentifié mon tableau de bord client apparait
      workers: workers,
      companyName: req.session.companyName
   })
})

companyRouter.get("/logout", async (req, res) => {
  req.session.destroy()
  res.redirect("connexion")
 });
 

module.exports = companyRouter;
