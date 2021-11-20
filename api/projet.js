const jwtreq = require('jsonwebtoken')
module.exports = (app, serviceProjet, serviceUser, jwt) => {

    app.get('/projet/:email/:id_client/:id_statut', jwt.validateJWT ,async (req, res) => {

        const user = await serviceUser.getByEmail(req.params.email)
        try{
            console.log(user)
            return res.json(await serviceProjet.getProjetByIdStatutIdClient(user.id_user, req.params.id_client, req.params.id_statut))
        }catch(e){
            console.log(e)
        }
    })

    app.post('/projet/add', jwt.validateJWT ,async (req, res) => {
        try{
            serviceProjet.insert(req.body.nom, req.body.id_statut, req.body.id_client)
            res.status(200).end()
        }catch(e){
            console.log(e)
            res.status(500).end()
        }
    })

    app.put('/projet/edit/:id_projet', jwt.validateJWT ,async (req, res) => {
        try{
            serviceProjet.update(req.body.nom, req.body.id_statut, req.body.id_client, req.params.id_projet)
            res.status(200).end()
        }catch(e){
            console.log(e)
            res.status(500).end()
        }
    })

    app.delete('/projet/delete/:id_projet', jwt.validateJWT ,async (req, res) => {
        try{
            serviceProjet.delete(req.params.id_projet)
            res.status(200).end()
        }catch(e){
            console.log(e)
            res.status(500).end()
        }
    })
}