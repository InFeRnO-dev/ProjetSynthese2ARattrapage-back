const ProjetDAO = require("../datamodel/projetdao")
const Projet = require('../class/projet')

module.exports = class ProjetService {
    constructor(db) {
        this.dao = new ProjetDAO(db)
    }

    getProjetByIdStatutIdClient(id_user,id_client, id_statut){
        return this.dao.getProjetByIdStatutIdClient(id_user, id_client, id_statut)
    }

    insert(nom, id_statut, id_client){
        return this.dao.insert(nom, id_statut, id_client)
    }

    update(nom, id_statut, id_client, id_projet){
        return this.dao.update(nom, id_statut, id_client, id_projet)
    }

    delete(id_projet){
        return this.dao.delete(id_projet)
    }
}