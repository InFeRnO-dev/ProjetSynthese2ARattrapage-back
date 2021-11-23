const Ligne_FactureDAO = require("../datamodel/ligne_facturedao")
const Ligne_Facture = require('../class/ligne_facture')

module.exports = class Ligne_FactureService {
    constructor(db) {
        this.dao = new Ligne_FactureDAO(db)
    }

    getAllLigneFactureByIdFacture(id_entete_facture){
        return this.dao.getAllLigneFactureByIdFacture(id_entete_facture)
    }

    insert(libelle, quantite, prix_unitaire, id_entete_facture){
        return this.dao.insert(libelle, quantite, prix_unitaire, id_entete_facture)
    }

    update(libelle, quantite, prix_unitaire, id_entete_facture, id_ligne_facture){
        return this.dao.update(libelle, quantite, prix_unitaire, id_entete_facture, id_ligne_facture)
    }

    delete(id_ligne_facture){
        return this.dao.delete(id_ligne_facture)
    }
}