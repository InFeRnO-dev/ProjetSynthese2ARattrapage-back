module.exports = class Entete_facture {
    constructor(libelle, quantite, prix_unitaire, id_entete_facture) {
        this.libelle = libelle
        this.quantite = quantite
        this.prix_unitaire = prix_unitaire
        this.id_entete_facture = id_entete_facture
    }
}