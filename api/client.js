const jwtreq = require('jsonwebtoken')
module.exports = (app, serviceClient, serviceUser, jwt) => {

    app.get('/client/:email', jwt.validateJWT ,async (req, res) => {

        const user = await serviceUser.getByEmail(req.params.email)
        try{
            return res.json(await serviceClient.getAllClientByIdUser(user.id_user))
        }catch(e){
            console.log(e)
        }
    })

    app.get('/client/:email/:search', jwt.validateJWT ,async (req, res) => {
        const user = await serviceUser.getByEmail(req.params.email)
        try{
            const clients = await serviceClient.getClientBySearch(user.id_user, req.params.search)
            return res.json(clients)
        }catch(e){
            console.log(e)
        }
    })

    app.post('/client/add', jwt.validateJWT ,async (req, res) => {

        const user = await serviceUser.getByEmail(req.body.emailuser)
        try{
            serviceClient.insert(req.body.nom, req.body.nom_contact, req.body.prenom, req.body.adresse_1, req.body.adresse_2, req.body.code_postal, req.body.ville, req.body.numero_telephone, req.body.email, user.id_user)
            res.status(200).end()
        }catch(e){
            console.log(e)
            res.status(500).end()
        }
    })

    app.put('/client/edit/:id_client', jwt.validateJWT ,async (req, res) => {
        const id_client = req.params.id_client
        try{
            serviceClient.update(req.body.nom, req.body.nom_contact, req.body.prenom, req.body.adresse_1, req.body.adresse_2, req.body.code_postal, req.body.ville, req.body.numero_telephone, req.body.email, id_client)
            res.status(200).end()
        }catch(e){
            console.log(e)
            res.status(500).end()
        }
    })

    app.delete('/client/delete/:id_client', jwt.validateJWT ,async (req, res) => {
        const id_client = req.params.id_client
        try{
            serviceClient.delete(id_client)
            res.status(200).end()
        }catch(e){
            console.log(e)
            res.status(500).end()
        }
    })

}