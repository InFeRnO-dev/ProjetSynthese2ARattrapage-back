const Etat_FactureDAO = require("../datamodel/etat_facturedao")
const Etat_Facture = require('../class/etat_facture')

module.exports = class Etat_FactureService {
    constructor(db) {
        this.dao = new Etat_FactureDAO(db)
    }

    getAllEtatFacture(){
        return this.dao.getAllEtatFacture()
    }

    insert(id_etat_facture, etat){
        return this.dao.insert(id_etat_facture, etat)
    }
}