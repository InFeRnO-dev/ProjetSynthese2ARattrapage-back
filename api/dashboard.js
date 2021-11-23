const jwtreq = require('jsonwebtoken')
module.exports = (app, serviceDashboard, serviceUser, jwt) => {

    app.get('/dashboard/CAannuel/:email/:annee', jwt.validateJWT ,async (req, res) => {

        const user = await serviceUser.getByEmail(req.params.email)
        const datedebut = req.params.annee + "-01-01"
        const datefin = req.params.annee + "-12-31"
        try{
            const CA_annuel = await serviceDashboard.getCAannuel(user.id_user, datedebut, datefin)
            const Paiements_attente = await serviceDashboard.getPaiementsAttente(user.id_user, datedebut, datefin)
            const A_facturer = await serviceDashboard.getAFacturer(user.id_user, datedebut, datefin)
            if(CA_annuel.ca_annuel === null){
                CA_annuel.ca_annuel = '0.00'
            }
            if(Paiements_attente.paiements_attente === null){
                Paiements_attente.paiements_attente = '0.00'
            }
            if(A_facturer.a_facturer === null){
                A_facturer.a_facturer = '0.00'
            }
            return res.json({ca_annuel: CA_annuel.ca_annuel, paiements_attente: Paiements_attente.paiements_attente, a_facturer: A_facturer.a_facturer})
        }catch(e){
            console.log(e)
        }
    })
}