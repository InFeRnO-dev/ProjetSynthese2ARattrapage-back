const jwtreq = require('jsonwebtoken')
module.exports = (app, serviceLigneFacture, jwt) => {

    app.get('/ligne_facture/:id_entete_facture', jwt.validateJWT ,async (req, res) => {
        try{
            return res.json(await serviceLigneFacture.getAllLigneFactureByIdFacture(req.params.id_entete_facture))
        }catch(e){
            console.log(e)
        }
    })

    app.post('/ligne_facture/add', jwt.validateJWT ,async (req, res) => {
        try{
            return res.json(await serviceLigneFacture.insert(req.body.libelle, req.body.quantite, req.body.prix_unitaire, req.body.id_entete_facture))
        }catch(e){
            console.log(e)
        }
    })

    app.put('/ligne_facture/edit/:id_ligne_facture', jwt.validateJWT ,async (req, res) => {
        try{
            return res.json(await serviceLigneFacture.update(req.body.libelle, req.body.quantite, req.body.prix_unitaire, req.body.id_entete_facture, req.params.id_ligne_facture))
        }catch(e){
            console.log(e)
        }
    })

    app.delete('/ligne_facture/delete/:id_ligne_facture', jwt.validateJWT ,async (req, res) => {
        try{
            return res.json(await serviceLigneFacture.delete(req.params.id_ligne_facture))
        }catch(e){
            console.log(e)
        }
    })
}