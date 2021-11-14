module.exports = (userService,
                  clientService
                  ) => {
    return new Promise(async (resolve, reject) => {

    /* 
                                            #### USER #####
    */

        // creation table user et seed user

        try {
            await userService.dao.db.query("CREATE TABLE public.user(id_user SERIAL PRIMARY KEY, email TEXT UNIQUE NOT NULL, nom TEXT NOT NULL, prenom TEXT NOT NULL, date_de_naissance DATE NOT NULL, adresse_1 TEXT NOT NULL, adresse_2 TEXT, code_postal TEXT NOT NULL, ville TEXT NOT NULL, numero_telephone TEXT NOT NULL, ca_annuel_max FLOAT NOT NULL, taux_charge INT NOT NULL, password TEXT NOT NULL, administrator BOOL)")
            // INSERTs
            userService.inserthash("admin@test.com", "admin", "admin", new Date(), "12 Rue du paradis", "Batiment 4", "13000", "Marseille", "0601020304", "35000", "25", "default", 1)
                .then(res => console.log(res))
                .catch(e => console.log(e))
        } catch (e) {
            if (e.code === "42P07") { // TABLE ALREADY EXISTS https://www.postgresql.org/docs/8.2/errcodes-appendix.html
                resolve()
                console.log("table user déjà créé")
            } else {
                reject(e)
                console.log(e)
            }
        }

        // creation table client

        try {
            await clientService.dao.db.query("CREATE TABLE public.client(id_client SERIAL PRIMARY KEY, nom TEXT NOT NULL, nom_contact TEXT, prenom TEXT, adresse_1 TEXT NOT NULL, adresse_2 TEXT, code_postal TEXT NOT NULL, ville TEXT NOT NULL, numero_telephone TEXT NOT NULL, email TEXT NOT NULL, id_user INT REFERENCES public.user(id_user))")
        } catch (e) {
            if (e.code === "42P07") { // TABLE ALREADY EXISTS https://www.postgresql.org/docs/8.2/errcodes-appendix.html
                resolve()
                console.log("table client déjà créé")
            } else {
                reject(e)
                console.log(e)
            }
        }
    })
}