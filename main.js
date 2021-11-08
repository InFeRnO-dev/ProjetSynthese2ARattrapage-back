const pg = require('pg')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

//Service user_droits
const UserService = require("./services/user")

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

const jwt = require('./jwt')(userService,
                            )

//Api user-droits

require("./api/user")(app, userService, jwt)

require('./datamodel/seeder')(userService,
                             )
   .then(app.listen(3333))
console.log("app listen on port 3333")

