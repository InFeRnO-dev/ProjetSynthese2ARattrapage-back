const BaseDAO = require('./basedao')

module.exports = class Entete_FactureDAO extends BaseDAO {

    constructor(db) {
        super(db, "entete_facture")
    }

    getAllEnteteFacture(id_user){
        return new Promise((resolve, reject) =>
        this.db.query(`SELECT enf.id_entete_facture,
                              enf.numero_facture,
                              enf.date_edition,
                              enf.date_paiement_limite,
                              enf.date_paiement_effectif,
                              enf.note,
                              enf.id_paiement,
                              paie.moyen_paiement,
                              enf.id_etat,
                              eta.etat,
                              enf.id_projet,
                              pro.nom as nom_projet,
                              pro.id_statut,
                              st.label as statut,
                              cli.nom as nom_client,
                              cli.nom_contact as nom_contact_client,
                              cli.prenom as prenom_client,
                              cli.adresse_1 as adresse_1_client,
                              cli.adresse_2 as adresse_2_client,
                              cli.code_postal as code_postal_client,
                              cli.ville as ville_client,
                              cli.numero_telephone as numero_telephone_client,
                              cli.email as email_client,
                              usr.email as email_user,
                              usr.nom as nom_user,
                              usr.prenom as prenom_user,
                              usr.adresse_1 as adresse_1_user,
                              usr.adresse_2 as adresse_2_user,
                              usr.code_postal as code_postal_user,
                              usr.ville as ville_user,
                              usr.numero_telephone as numero_telephone_user,
                              usr.taux_charge
                       FROM public.entete_facture enf
                       LEFT JOIN public.moyen_paiement_facture paie on paie.id_moyen_paiement_facture = enf.id_paiement
                       LEFT JOIN public.etat_facture eta on eta.id_etat_facture = enf.id_etat
                       LEFT JOIN public.projet pro on pro.id_projet = enf.id_projet
                       LEFT JOIN public.client cli on cli.id_client = pro.id_client
                       LEFT JOIN public.statut st on st.id_statut = pro.id_statut
                       LEFT JOIN public.user usr on usr.id_user = cli.id_user
                       WHERE usr.id_user = $1`,[id_user])
            .then(res => {resolve(res.rows)})
            .catch(e => {reject(e)}))
    }

    getNumeroFactureMax(id_user){
        return new Promise((resolve, reject) =>
        this.db.query(`SELECT max(numero_facture) numero_facture 
                       FROM public.entete_facture enf
                       LEFT JOIN public.projet pro on pro.id_projet = enf.id_projet
                       LEFT JOIN public.client cli on cli.id_client = pro.id_client
                       LEFT JOIN public.user usr on usr.id_user = cli.id_user
                       WHERE usr.id_user = $1`,[id_user])
        .then(res => {resolve(res.rows[0])})
        .catch(e => {reject(e)}))
    }

    getAllEnteteFactureByIdProjet(id_projet){
        return new Promise((resolve, reject) =>
        this.db.query(`SELECT * from public.entete_facture WHERE id_projet = $1`,[id_projet])
        .then(res => {resolve(res.rows)})
        .catch(e => {reject(e)}))
    }

    insert(numero_facture, date_edition, date_paiement_limite, date_paiement_effectif, note, id_paiement, id_etat, id_projet) {
        return this.db.query("INSERT INTO public.entete_facture(numero_facture, date_edition, date_paiement_limite, date_paiement_effectif, note, id_paiement, id_etat, id_projet) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)",
            [numero_facture, date_edition, date_paiement_limite, date_paiement_effectif, note, id_paiement, id_etat, id_projet])
    }

    update(id_entete_facture, numero_facture, date_edition, date_paiement_limite, date_paiement_effectif, note, id_paiement, id_etat, id_projet) {
        return this.db.query("UPDATE public.entete_facture SET numero_facture = $1, date_edition = $2, date_paiement_limite = $3, date_paiement_effectif = $4, note = $5, id_paiement = $6, id_etat = $7, id_projet = $8 WHERE id_entete_facture = $9",
            [numero_facture, date_edition, date_paiement_limite, date_paiement_effectif, note, id_paiement, id_etat, id_projet, id_entete_facture])
    }

    delete(id_entete_facture){
        return this.db.query("DELETE FROM public.entete_facture WHERE id_entete_facture = $1",[id_entete_facture])
    }

}