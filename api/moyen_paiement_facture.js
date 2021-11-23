const jwtreq = require('jsonwebtoken')
module.exports = (app, serviceMoyenPaiementFacture, jwt) => {

    app.get('/moyen_paiement_facture', jwt.validateJWT ,async (req, res) => {
        try{
            return res.json(await serviceMoyenPaiementFacture.getAllMoyenPaiementFacture())
        }catch(e){
            console.log(e)
        }
    })
}