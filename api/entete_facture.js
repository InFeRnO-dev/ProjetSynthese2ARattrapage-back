const jwtreq = require('jsonwebtoken')
module.exports = (app, serviceEnteteFacture, serviceUser, jwt) => {

    app.get('/entete_facture/numero_facture_max/:email', jwt.validateJWT ,async (req, res) => {

        const user = await serviceUser.getByEmail(req.params.email)
        try{
            return res.json(await serviceEnteteFacture.getNumeroFactureMax(user.id_user))
        }catch(e){
            console.log(e)
        }
    })

    app.get('/entete_facture/:email', jwt.validateJWT ,async (req, res) => {

        const user = await serviceUser.getByEmail(req.params.email)
        try{
            return res.json(await serviceEnteteFacture.getAllEnteteFacture(user.id_user))
        }catch(e){
            console.log(e)
        }
    })

    app.get('/entete_facture/projet/:id_projet', jwt.validateJWT ,async (req, res) => {
        try{
            return res.json(await serviceEnteteFacture.getAllEnteteFactureByIdProjet(req.params.id_projet))
        }catch(e){
            console.log(e)
        }
    })

    app.post('/entete_facture/add', jwt.validateJWT ,async (req, res) => {
        try{
            if(req.body.date_paiement_effectif === ""){
                req.body.date_paiement_effectif = null
            }
            return res.json(await serviceEnteteFacture.insert(req.body.numero_facture, req.body.date_edition, req.body.date_paiement_limite, req.body.date_paiement_effectif, req.body.note, req.body.id_paiement, req.body.id_etat, req.body.id_projet))
        }catch(e){
            console.log(e)
        }
    })

    app.put('/entete_facture/edit/:id_entete_facture', jwt.validateJWT ,async (req, res) => {
        try{
            return res.json(await serviceEnteteFacture.update(req.params.id_entete_facture, req.body.numero_facture, req.body.date_edition, req.body.date_paiement_limite, req.body.date_paiement_effectif, req.body.note, req.body.id_paiement, req.body.id_etat, req.body.id_projet))
        }catch(e){
            console.log(e)
        }
    })

    app.delete('/entete_facture/delete/:id_entete_facture', jwt.validateJWT ,async (req, res) => {
        try{
            return res.json(await serviceEnteteFacture.delete(req.params.id_entete_facture))
        }catch(e){
            console.log(e)
        }
    })

}