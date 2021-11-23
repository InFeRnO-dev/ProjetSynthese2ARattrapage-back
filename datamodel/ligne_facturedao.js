const BaseDAO = require('./basedao')

module.exports = class Ligne_FactureDAO extends BaseDAO {

    constructor(db) {
        super(db, "ligne_facture")
    }

    getAllLigneFactureByIdFacture(id_entete_facture){
        return new Promise((resolve, reject) =>
        this.db.query("SELECT * FROM public.ligne_facture WHERE id_entete_facture = $1 ORDER BY id_ligne_facture ASC",[id_entete_facture])
            .then(res => {resolve(res.rows)})
            .catch(e => {reject(e)}))
    }

    insert(libelle, quantite, prix_unitaire, id_entete_facture) {
        return this.db.query("INSERT INTO public.ligne_facture(libelle, quantite, prix_unitaire, id_entete_facture) VALUES ($1,$2,$3,$4)",
            [libelle, quantite, prix_unitaire, id_entete_facture])
    }

    update(libelle, quantite, prix_unitaire, id_entete_facture, id_ligne_facture) {
        return this.db.query("UPDATE public.ligne_facture SET libelle = $1, quantite = $2, prix_unitaire = $3, id_entete_facture = $4 WHERE id_ligne_facture = $5",
            [libelle, quantite, prix_unitaire, id_entete_facture, id_ligne_facture])
    }

    delete(id_ligne_facture) {
        return this.db.query("DELETE FROM public.ligne_facture WHERE id_ligne_facture = $1",
            [id_ligne_facture])
    }

}