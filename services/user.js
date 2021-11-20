const bcrypt = require('bcrypt')
const UserDAO = require("../datamodel/userdao")
const User = require('../class/user')

module.exports = class UserService {
    constructor(db) {
        this.dao = new UserDAO(db)
    }

    async getAll(){
        return this.dao.getAll()
    }

    async getByEmail(email) {
        return this.dao.getByEmail(email)
    }

    inserthash(email, nom, prenom, date_de_naissance, adresse_1, adresse_2, code_postal, ville, numero_telephone, ca_annuel_max, taux_charge, password, administrator) {
        return this.dao.insert(email, nom, prenom, date_de_naissance, adresse_1, adresse_2, code_postal, ville, numero_telephone, ca_annuel_max, taux_charge, this.hashPassword(password), administrator)
    }
    update(email, nom, prenom, date_de_naissance, adresse_1, adresse_2, code_postal, ville, numero_telephone, ca_annuel_max, taux_charge, password, administrator, id_user){
        if(email !== "" || email !== undefined || email !== null || 
           nom !== "" || nom !== undefined || nom !== null ||
           prenom !== "" || prenom !== undefined || prenom !== null ||
           date_de_naissance !== "" || date_de_naissance !== undefined || date_de_naissance !== null ||
           adresse_1 !== "" || adresse_1 === undefined || adresse_1 === null ||
           adresse_2 !== undefined ||
           code_postal !== "" || code_postal !== undefined || code_postal !== null ||
           ville !== "" || ville !== undefined || ville !== null ||
           numero_telephone !== "" || numero_telephone !== undefined || numero_telephone !== null ||
           ca_annuel_max !== "" || ca_annuel_max !== undefined || ca_annuel_max !== null ||
           taux_charge !== "" || taux_charge !== undefined || taux_charge !== null ||
           password !== "" || password !== undefined || password !== null ||
           administrator !== "" || administrator !== undefined || administrator !== null){

           return this.dao.update(email, nom, prenom, date_de_naissance, adresse_1, adresse_2, code_postal, ville, numero_telephone, ca_annuel_max, taux_charge, this.hashPassword(password), administrator, id_user)
        }
    }
    delete(email){
        return this.dao.delete(email)
    }
    async validatePassword(email, password) {
        const user = await this.dao.getByEmail(email.trim())
        return this.comparePassword(password, user.password)
    }
    comparePassword(password, hash) {
        return bcrypt.compareSync(password, hash)
    }
    hashPassword(password) {
        return bcrypt.hashSync(password, 5)
    }

}