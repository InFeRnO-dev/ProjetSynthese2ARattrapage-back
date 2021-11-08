const BaseDAO = require('./basedao')

module.exports = class UserDAO extends BaseDAO {
    constructor(db) {
        super(db, "user")
    }

    getAll() {
        return new Promise((resolve, reject) =>
            this.db.query("SELECT * FROM public.user ORDER BY email ASC")
                .then(res => {resolve(res.rows)})
                .catch(e => {reject(e)}))
    }

    getByEmail(email) {
        return new Promise((resolve, reject) =>
            this.db.query("SELECT * FROM public.user WHERE email=$1", [ email ])
                .then(res => resolve(res.rows[0]))
                .catch(e => reject(e)))
    }

    insert(email, nom, prenom, date_de_naissance, adresse_1, adresse_2, code_postal, ville, numero_telephone, ca_annuel_max, taux_charge, password, administrator) {
        return this.db.query("INSERT INTO public.user(email, nom, prenom, date_de_naissance, adresse_1, adresse_2, code_postal, ville, numero_telephone, ca_annuel_max, taux_charge, password, administrator) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)",
            [email, nom, prenom, date_de_naissance, adresse_1, adresse_2, code_postal, ville, numero_telephone, ca_annuel_max, taux_charge, password, administrator])
    }

    update(email, nom, prenom, date_de_naissance, adresse_1, adresse_2, code_postal, ville, numero_telephone, ca_annuel_max, taux_charge, password, administrator) {
            return this.db.query("UPDATE public.user SET nom=$2, prenom=$3, date_de_naissance=$4, adresse_1=$5, adresse_2=$6, code_postal=$7, ville=$8, numero_telephone=$9, ca_annuel_max=$10, taux_charge=$11, password=$12, administrator=$13 WHERE email=$1",
            [email, nom, prenom, date_de_naissance, adresse_1, adresse_2, code_postal, ville, numero_telephone, ca_annuel_max, taux_charge, password, administrator])
    }

    delete(email) {
        return this.db.query("DELETE FROM public.user WHERE email=$1",
        [email])
    }
}