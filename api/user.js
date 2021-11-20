const jwtreq = require('jsonwebtoken')
module.exports = (app, serviceUser, jwt) => {

    app.get('/user', async (req, res) => {
        try{
            return res.json(await serviceUser.dao.getAll())
        }catch(e){
            console.log(e)
        }
    })

    app.get('/user/:email', async (req, res) => {
        try{
            const user = await serviceUser.dao.getByEmail(req.params.email)
            return res.json(user)
        }catch(e){
            console.log(e)
        }
        
    })

    app.post('/user/add', async (req, res) => {
        try{
            serviceUser.inserthash(req.body.email, req.body.nom, req.body.prenom, req.body.date_de_naissance, req.body.adresse_1, req.body.adresse_2, req.body.code_postal, req.body.ville, req.body.numero_telephone, req.body.ca_annuel_max, req.body.taux_charge, req.body.password, req.body.administrator)
            res.status(200).end()
        }catch(e){
            console.log(e)
            res.status(500).end()
        }
    })
    app.put('/user/edit/:email', async (req, res) => {
        const user = await serviceUser.getByEmail(req.params.email)
        try{
            serviceUser.update(req.body.email, req.body.nom, req.body.prenom, req.body.date_de_naissance, req.body.adresse_1, req.body.adresse_2, req.body.code_postal, req.body.ville, req.body.numero_telephone, req.body.ca_annuel_max, req.body.taux_charge, req.body.password, req.body.administrator, user.id_user)
            .then(res.status(200).end())
            
        }catch(e){
            console.log(e)
            res.status(500).end()
        }
    })

    app.delete('/user/delete/:email', (req, res) => {
        try{
            serviceUser.delete(req.params.email)
            .then(res.status(200).end())

        }catch(e){
            res.status(500).end()
            console.log(e)
        }
    })

    app.post('/user/authenticate', async (req, res) => {
        const email = req.body.email
        const password = req.body.password
        if ((email === undefined) || (password === undefined)) {
            res.status(400).end()
            return
        }
        const usertmp = await serviceUser.dao.getByEmail(email)
        try{
            serviceUser.validatePassword(email, password)
            .then(async autheticated => {
                if (!autheticated) {
                    res.status(401).end()
                    return
                }
                const user = {email: usertmp.email, administrator: usertmp.administrator}
                res.json({'token': jwt.generateJWT(user)})
            })
            .catch(e => {
                console.log(e)
                res.status(500).end()
            })
        } 
        catch(e){
            console.log(e)
        }
        
    })

    app.post('/user/timeout', (req,res) => {
        let oldtoken = req.body.token
        jwtreq.verify(oldtoken, jwt.getKey(), {algorithm: "HS256"}, (err) => {
            if(err) {
                if(err.name === 'TokenExpiredError') {
                    return res.status(401).end()
                }
            }
        })
        try {
            res.json({'token': jwt.generateJWT(this.email)})
        } catch (e) {
            console.log(e)
        }

    })
}