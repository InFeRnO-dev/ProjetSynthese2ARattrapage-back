const jwtreq = require('jsonwebtoken')
module.exports = (app, serviceEtatFacture, jwt) => {

    app.get('/etat_facture', jwt.validateJWT ,async (req, res) => {
        try{
            return res.json(await serviceEtatFacture.getAllEtatFacture())
        }catch(e){
            console.log(e)
        }
    })
}