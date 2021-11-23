const Entete_FactureDAO = require("../datamodel/entete_facturedao")
const Entete_Facture = require('../class/entete_facture')

module.exports = class Entete_FactureService {
    constructor(db) {
        this.dao = new Entete_FactureDAO(db)
    }

    getAllEnteteFacture(id_user){
        return this.dao.getAllEnteteFacture(id_user)
    }

    getNumeroFactureMax(id_user){
        return this.dao.getNumeroFactureMax(id_user)
    }

    getAllEnteteFactureByIdProjet(id_projet){
        return this.dao.getAllEnteteFactureByIdProjet(id_projet)
    }

    insert(numero_facture, date_edition, date_paiement_limite, date_paiement_effectif, note, id_paiement, id_etat, id_projet){
        return this.dao.insert(numero_facture, date_edition, date_paiement_limite, date_paiement_effectif, note, id_paiement, id_etat, id_projet)
    }

    update(id_entete_facture, numero_facture, date_edition, date_paiement_limite, date_paiement_effectif, note, id_paiement, id_etat, id_projet){
        return this.dao.update(id_entete_facture, numero_facture, date_edition, date_paiement_limite, date_paiement_effectif, note, id_paiement, id_etat, id_projet)
    }

    delete(id_entete_facture){
        return this.dao.delete(id_entete_facture)
    }
}