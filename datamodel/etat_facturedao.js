const BaseDAO = require('./basedao')

module.exports = class Etat_FactureDAO extends BaseDAO {

    constructor(db) {
        super(db, "etat_facture")
    }

    getAllEtatFacture(){
        return new Promise((resolve, reject) =>
        this.db.query("SELECT * FROM public.etat_facture ORDER BY id_etat_facture ASC")
            .then(res => {resolve(res.rows)})
            .catch(e => {reject(e)}))
    }

    insert(id_etat_facture, etat) {
        return this.db.query("INSERT INTO public.etat_facture(id_etat_facture, etat) VALUES ($1,$2)",
            [id_etat_facture, etat])
    }

}