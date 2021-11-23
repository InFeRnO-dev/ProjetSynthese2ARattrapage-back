const pg = require('pg')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

const UserService = require("./services/user")
const ClientService = require("./services/client")
const StatutService = require("./services/statut")
const ProjetService = require("./services/projet")
const Etat_FactureService = require("./services/etat_facture")
const Moyen_Paiement_FactureService = require("./services/moyen_paiement_facture")
const Entete_FactureService = require("./services/entete_facture")
const Ligne_FactureService = require("./services/ligne_facture")
const DashboardService = require("./services/dashboard")

const app = express()
app.use(bodyParser.urlencoded({ extended: false })) // URLEncoded form data
app.use(bodyParser.json()) // application/json
app.use(cors())
app.use(morgan('dev')); // toutes les requêtes HTTP dans le log du serveur

const connectionString = "postgres://postgres:root@127.0.0.1:5432/ps2arattrapage"

const db = new pg.Pool({ connectionString: connectionString })

const userService = new UserService(db)
const clientService = new ClientService(db)
const statutService = new StatutService(db)
const projetService = new ProjetService(db)
const etatfactureService = new Etat_FactureService(db)
const moyenpaiementfactureService = new Moyen_Paiement_FactureService(db)
const entetefactureService = new Entete_FactureService(db)
const lignefactureService = new Ligne_FactureService(db)
const dashboardService = new DashboardService(db)

const jwt = require('./jwt')(userService,
                             clientService,
                             statutService,
                             projetService,
                             etatfactureService,
                             moyenpaiementfactureService,
                             entetefactureService,
                             lignefactureService,
                             dashboardService
                            )

require("./api/user")(app, userService, jwt)
require("./api/client")(app, clientService, userService, jwt)
require("./api/statut")(app, statutService, jwt)
require("./api/projet")(app, projetService, userService, jwt)
require("./api/etat_facture")(app, etatfactureService, jwt)
require("./api/moyen_paiement_facture")(app, moyenpaiementfactureService, jwt)
require("./api/entete_facture")(app, entetefactureService, userService, jwt)
require("./api/ligne_facture")(app, lignefactureService, jwt)
require("./api/dashboard")(app, dashboardService, userService, jwt)

require('./datamodel/seeder')(userService,
                              clientService,
                              statutService,
                              projetService,
                              etatfactureService,
                              moyenpaiementfactureService,
                              entetefactureService,
                              lignefactureService,
                              dashboardService
                             )
   .then(app.listen(3333))
console.log("app listen on port 3333")

