module.exports = class Entete_facture {
    constructor(id_entete_facture, numero_facture, date_edition, date_paiement_limite, date_paiement_effectif, note, id_paiement, id_etat, id_projet) {
        this.id_entete_facture = id_entete_facture
        this.numero_facture = numero_facture
        this.date_edition = date_edition
        this.date_paiement_limite = date_paiement_limite
        this.date_paiement_effectif = date_paiement_effectif
        this.note = note
        this.id_paiement = id_paiement
        this.id_etat = id_etat
        this.id_projet = id_projet
    }
}