const StatutDAO = require("../datamodel/statutdao")
const Statut = require('../class/statut')

module.exports = class StatutService {
    constructor(db) {
        this.dao = new StatutDAO(db)
    }

    getAllStatut(){
        return this.dao.getAllStatut()
    }

    insert(id_statut, label){
        return this.dao.insert(id_statut, label)
    }
}