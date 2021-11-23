module.exports = (userService,
                  clientService,
                  statutService,
                  projetService,
                  etatfactureService,
                  moyenpaiementfactureService,
                  entetefactureService,
                  lignefactureService,
                  dashboardService
                  ) => {
    return new Promise(async (resolve, reject) => {

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

        // creation table statut et seed statut

        try {
            await statutService.dao.db.query("CREATE TABLE public.statut(id_statut SERIAL PRIMARY KEY, label TEXT NOT NULL)")
            //INSERTs
            statutService.insert(1, "prospect").then(res => console.log(res)).catch(e => console.log(e))
            statutService.insert(2, "devis envoyé").then(res => console.log(res)).catch(e => console.log(e))
            statutService.insert(3, "devis accepté").then(res => console.log(res)).catch(e => console.log(e))
            statutService.insert(4, "démarré").then(res => console.log(res)).catch(e => console.log(e))
            statutService.insert(5, "terminé").then(res => console.log(res)).catch(e => console.log(e))
            statutService.insert(6, "annulé").then(res => console.log(res)).catch(e => console.log(e))
        } catch (e) {
            if (e.code === "42P07") { // TABLE ALREADY EXISTS https://www.postgresql.org/docs/8.2/errcodes-appendix.html
                resolve()
                console.log("table statut déjà créé")
            } else {
                reject(e)
                console.log(e)
            }
        }

          // creation table projet

          try {
            await projetService.dao.db.query("CREATE TABLE public.projet(id_projet SERIAL PRIMARY KEY, nom TEXT NOT NULL, id_statut INT REFERENCES public.statut(id_statut), id_client INT REFERENCES public.client(id_client))")
        } catch (e) {
            if (e.code === "42P07") { // TABLE ALREADY EXISTS https://www.postgresql.org/docs/8.2/errcodes-appendix.html
                resolve()
                console.log("table projet déjà créé")
            } else {
                reject(e)
                console.log(e)
            }
        }

        // creation table etat_facture et seed etat_facture

        try {
            await etatfactureService.dao.db.query("CREATE TABLE public.etat_facture(id_etat_facture SERIAL PRIMARY KEY, etat TEXT NOT NULL)")
            //INSERTs
            etatfactureService.insert(1, "Editée").then(res => console.log(res)).catch(e => console.log(e))
            etatfactureService.insert(2, "Envoyée").then(res => console.log(res)).catch(e => console.log(e))
            etatfactureService.insert(3, "Payée").then(res => console.log(res)).catch(e => console.log(e))
        } catch (e) {
            if (e.code === "42P07") { // TABLE ALREADY EXISTS https://www.postgresql.org/docs/8.2/errcodes-appendix.html
                resolve()
                console.log("table etat_facture déjà créé")
            } else {
                reject(e)
                console.log(e)
            }
        }

        // creation table moyen_paiement_facture et seed moyen_paiement_facture

        try {
            await moyenpaiementfactureService.dao.db.query("CREATE TABLE public.moyen_paiement_facture(id_moyen_paiement_facture SERIAL PRIMARY KEY, moyen_paiement TEXT NOT NULL)")
            //INSERTs
            moyenpaiementfactureService.insert(1, "Chèque").then(res => console.log(res)).catch(e => console.log(e))
            moyenpaiementfactureService.insert(2, "Virement").then(res => console.log(res)).catch(e => console.log(e))
            moyenpaiementfactureService.insert(3, "Paypal").then(res => console.log(res)).catch(e => console.log(e))
            moyenpaiementfactureService.insert(4, "Autre").then(res => console.log(res)).catch(e => console.log(e))
        } catch (e) {
            if (e.code === "42P07") { // TABLE ALREADY EXISTS https://www.postgresql.org/docs/8.2/errcodes-appendix.html
                resolve()
                console.log("table moyen_paiement_facture déjà créé")
            } else {
                reject(e)
                console.log(e)
            }
        }

        // creation table entete_facture

        try {
            await entetefactureService.dao.db.query("CREATE TABLE public.entete_facture(id_entete_facture SERIAL PRIMARY KEY, numero_facture INT NOT NULL, date_edition DATE NOT NULL, date_paiement_limite DATE NOT NULL, date_paiement_effectif DATE, note TEXT, id_paiement INT REFERENCES public.moyen_paiement_facture(id_moyen_paiement_facture), id_etat INT REFERENCES public.etat_facture(id_etat_facture), id_projet INT REFERENCES public.projet(id_projet))")
        } catch (e) {
            if (e.code === "42P07") { // TABLE ALREADY EXISTS https://www.postgresql.org/docs/8.2/errcodes-appendix.html
                resolve()
                console.log("table entete_facture déjà créé")
            } else {
                reject(e)
                console.log(e)
            }
        }

        // creation table ligne_facture

        try {
            await lignefactureService.dao.db.query("CREATE TABLE public.ligne_facture(id_ligne_facture SERIAL PRIMARY KEY, libelle TEXT NOT NULL, quantite INT NOT NULL, prix_unitaire NUMERIC(7,2), id_entete_facture INT REFERENCES public.entete_facture(id_entete_facture) ON DELETE CASCADE)")
        } catch (e) {
            if (e.code === "42P07") { // TABLE ALREADY EXISTS https://www.postgresql.org/docs/8.2/errcodes-appendix.html
                resolve()
                console.log("table ligne_facture déjà créé")
            } else {
                reject(e)
                console.log(e)
            }
        }
    })
}