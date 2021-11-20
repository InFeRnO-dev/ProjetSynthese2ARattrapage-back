const jwtreq = require('jsonwebtoken')
module.exports = (app, serviceStatut, jwt) => {

    app.get('/statut', jwt.validateJWT ,async (req, res) => {
        try{
            return res.json(await serviceStatut.getAllStatut())
        }catch(e){
            console.log(e)
        }
    })
}