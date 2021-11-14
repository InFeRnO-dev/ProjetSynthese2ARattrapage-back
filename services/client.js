const ClientDAO = require("../datamodel/clientdao")
const Client = require('../class/client')

module.exports = class UserService {
    constructor(db) {
        this.dao = new ClientDAO(db)
    }

    getAll(){
        return this.dao.getAll()
    }

    getAllClientByIdUser(id){
        return this.dao.getAllClientByIdUser(id)
    }

    getClientBySearch(id, search){
        return this.dao.getClientBySearch(id, search)
    }

    insert(nom, nom_contact, prenom, adresse_1, adresse_2, code_postal, ville, numero_telephone, email, id_user) {
        console.log(nom, nom_contact, prenom, adresse_1, adresse_2, code_postal, ville, numero_telephone, email, id_user)
        return this.dao.insert(nom, nom_contact, prenom, adresse_1, adresse_2, code_postal, ville, numero_telephone, email, id_user)
    }

    update(nom, nom_contact, prenom, adresse_1, adresse_2, code_postal, ville, numero_telephone, email, id_client) {
        console.log(nom, nom_contact, prenom, adresse_1, adresse_2, code_postal, ville, numero_telephone, email, id_client)
        return this.dao.update(nom, nom_contact, prenom, adresse_1, adresse_2, code_postal, ville, numero_telephone, email, id_client)
    }

    delete(id_client) {
        console.log(id_client)
        return this.dao.delete(id_client)
    }
}