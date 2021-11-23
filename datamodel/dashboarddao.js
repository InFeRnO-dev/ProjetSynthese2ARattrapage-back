const BaseDAO = require('./basedao')

module.exports = class DashboardDAO extends BaseDAO {

    constructor(db) {
        super(db, "dashboard")
    }

    getCAannuel(id_user, datedebut, datefin) {
        return new Promise((resolve, reject) =>
            this.db.query(`SELECT sum((lif.quantite * lif.prix_unitaire)) ca_annuel
                           FROM public.entete_facture enf
                           LEFT JOIN public.ligne_facture lif on lif.id_entete_facture = enf.id_entete_facture 
                           LEFT JOIN public.etat_facture eta on eta.id_etat_facture = enf.id_etat
                           LEFT JOIN public.projet pro on pro.id_projet = enf.id_projet
                           LEFT JOIN public.client cli on cli.id_client = pro.id_client
                           LEFT JOIN public.user usr on usr.id_user = cli.id_user
                           WHERE date_edition BETWEEN $1 AND $2
                           AND usr.id_user = $3 AND lif.id_ligne_facture NOTNULL`, [datedebut, datefin, id_user])
                           
                .then(res => {resolve(res.rows[0])})
                .catch(e => {reject(e)}))
    }

    getPaiementsAttente(id_user, datedebut, datefin) {
        return new Promise((resolve, reject) =>
            this.db.query(`SELECT sum((lif.quantite * lif.prix_unitaire)) paiements_attente
                           FROM public.entete_facture enf
                           LEFT JOIN public.ligne_facture lif on lif.id_entete_facture = enf.id_entete_facture 
                           LEFT JOIN public.etat_facture eta on eta.id_etat_facture = enf.id_etat
                           LEFT JOIN public.projet pro on pro.id_projet = enf.id_projet
                           LEFT JOIN public.client cli on cli.id_client = pro.id_client
                           LEFT JOIN public.user usr on usr.id_user = cli.id_user
                           WHERE date_edition BETWEEN $1 AND $2
                           AND usr.id_user = $3 AND lif.id_ligne_facture NOTNULL
                           AND eta.id_etat_facture = 2`, [datedebut, datefin, id_user])          
                .then(res => {resolve(res.rows[0])})
                .catch(e => {reject(e)}))
    }

    getAFacturer(id_user, datedebut, datefin) {
        return new Promise((resolve, reject) =>
            this.db.query(`SELECT sum((lif.quantite * lif.prix_unitaire)) a_facturer
                           FROM public.entete_facture enf
                           LEFT JOIN public.ligne_facture lif on lif.id_entete_facture = enf.id_entete_facture 
                           LEFT JOIN public.etat_facture eta on eta.id_etat_facture = enf.id_etat
                           LEFT JOIN public.projet pro on pro.id_projet = enf.id_projet
                           LEFT JOIN public.client cli on cli.id_client = pro.id_client
                           LEFT JOIN public.user usr on usr.id_user = cli.id_user
                           WHERE date_edition BETWEEN $1 AND $2
                           AND usr.id_user = $3 AND lif.id_ligne_facture NOTNULL
                           AND eta.id_etat_facture = 1`, [datedebut, datefin, id_user])          
                .then(res => {resolve(res.rows[0])})
                .catch(e => {reject(e)}))
    }
}