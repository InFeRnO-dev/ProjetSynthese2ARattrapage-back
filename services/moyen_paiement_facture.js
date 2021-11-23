const Moyen_Paiement_FactureDAO = require("../datamodel/moyen_paiement_facturedao")
const Moyen_Paiement_Facture = require('../class/moyen_paiement_facture')

module.exports = class Moyen_Paiement_FactureService {
    constructor(db) {
        this.dao = new Moyen_Paiement_FactureDAO(db)
    }

    getAllMoyenPaiementFacture(){
        return this.dao.getAllEtatFacture()
    }

    insert(id_moyen_paiement_facture, moyen_paiement){
        return this.dao.insert(id_moyen_paiement_facture, moyen_paiement)
    }
}