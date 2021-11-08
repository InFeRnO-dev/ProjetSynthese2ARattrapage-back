module.exports = class User {
    constructor(email, nom, prenom, date_de_naissance, adresse_1, adresse_2, code_postal, ville, numero_telephone, ca_annuel_max, taux_charge, password, administrator) {
        this.email = email
        this.nom = nom
        this.prenom = prenom
        this.date_de_naissance = date_de_naissance
        this.adresse_1 = adresse_1
        this.adresse_2 = adresse_2
        this.code_postal = code_postal
        this.ville = ville
        this.numero_telephone = numero_telephone
        this.ca_annuel_max = ca_annuel_max
        this.taux_charge = taux_charge
        this.password = password
        this.administrator = administrator
    }
}