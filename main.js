const pg = require('pg')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

//Service user_droits
const UserService = require("./services/user")
const ClientService = require("./services/client")
const StatutService = require("./services/statut")
const ProjetService = require("./services/projet")

const app = express()
app.use(bodyParser.urlencoded({ extended: false })) // URLEncoded form data
app.use(bodyParser.json()) // application/json
app.use(cors())
app.use(morgan('dev')); // toutes les requêtes HTTP dans le log du serveur


//const connectionString = "postgres://postgres:root@localhost:5432/ps2a"
const connectionString = "postgres://postgres:root@127.0.0.1:5432/ps2arattrapage"

const db = new pg.Pool({ connectionString: connectionString })

//New Service user-droits

const userService = new UserService(db)
const clientService = new ClientService(db)
const statutService = new StatutService(db)
const projetService = new ProjetService(db)

const jwt = require('./jwt')(userService,
                             clientService,
                             statutService,
                             projetService
                            )

//Api user-droits

require("./api/user")(app, userService, jwt)
require("./api/client")(app, clientService, userService, jwt)
require("./api/statut")(app, statutService, jwt)
require("./api/projet")(app, projetService, userService, jwt)

require('./datamodel/seeder')(userService,
                              clientService,
                              statutService,
                              projetService
                             )
   .then(app.listen(3333))
console.log("app listen on port 3333")

