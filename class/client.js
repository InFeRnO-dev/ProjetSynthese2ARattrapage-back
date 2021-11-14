module.exports = class Client {
    constructor(nom, nom_contact, prenom, adresse_1, adresse_2, code_postal, ville, numero_telephone, email) {
        this.nom = nom
        this.nom_contact = nom_contact
        this.prenom = prenom
        this.adresse_1 = adresse_1
        this.adresse_2 = adresse_2
        this.code_postal = code_postal
        this.ville = ville
        this.numero_telephone = numero_telephone
        this.email = email
    }
}