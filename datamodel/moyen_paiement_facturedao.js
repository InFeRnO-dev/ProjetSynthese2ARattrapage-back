const BaseDAO = require('./basedao')

module.exports = class Moyen_Paiement_FactureDAO extends BaseDAO {

    constructor(db) {
        super(db, "moyen_paiement_facture")
    }

    getAllEtatFacture(){
        return new Promise((resolve, reject) =>
        this.db.query("SELECT * FROM public.moyen_paiement_facture ORDER BY id_moyen_paiement_facture ASC")
            .then(res => {resolve(res.rows)})
            .catch(e => {reject(e)}))
    }

    insert(id_moyen_paiement_facture, moyen_paiement) {
        return this.db.query("INSERT INTO public.moyen_paiement_facture(id_moyen_paiement_facture, moyen_paiement) VALUES ($1,$2)",
            [id_moyen_paiement_facture, moyen_paiement])
    }

}