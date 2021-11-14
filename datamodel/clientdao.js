const BaseDAO = require('./basedao')

module.exports = class ClientDAO extends BaseDAO {

    constructor(db) {
        super(db, "client")
    }

    getAllClientByIdUser(id) {
        return new Promise((resolve, reject) =>
            this.db.query("SELECT * FROM public.client WHERE id_user=$1 ORDER BY nom ASC", [id])
                .then(res => {resolve(res.rows)})
                .catch(e => {reject(e)}))
    }

    getClientBySearch(id, search) {
        return new Promise((resolve, reject) =>
            this.db.query(`SELECT * FROM public.client WHERE id_user=$1 AND (
                nom like '%' || $2 || '%' OR
                prenom like '%' || $2 || '%' OR
                nom_contact like '%' || $2 || '%' OR
                ville like '%' || $2 || '%' OR
                email like '%' || $2 || '%' OR
                numero_telephone like '%' || $2 || '%'
            ) 
            ORDER BY nom ASC`, [id, search])
                .then(res => {resolve(res.rows)})
                .catch(e => {reject(e)}))
    }

    insert(nom, nom_contact, prenom, adresse_1, adresse_2, code_postal, ville, numero_telephone, email, id_user) {
        return this.db.query("INSERT INTO public.client(nom, nom_contact, prenom, adresse_1, adresse_2, code_postal, ville, numero_telephone, email, id_user) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)",
            [nom, nom_contact, prenom, adresse_1, adresse_2, code_postal, ville, numero_telephone, email, id_user])
    }

    update(nom, nom_contact, prenom, adresse_1, adresse_2, code_postal, ville, numero_telephone, email, id_client) {
        return this.db.query("UPDATE public.client SET nom = $1, nom_contact = $2, prenom = $3, adresse_1 = $4, adresse_2 = $5, code_postal = $6, ville = $7, numero_telephone = $8, email = $9 WHERE id_client = $10",
            [nom, nom_contact, prenom, adresse_1, adresse_2, code_postal, ville, numero_telephone, email, id_client])
    }

    delete(id_client) {
        return this.db.query("DELETE FROM public.client WHERE id_client = $1", [id_client])
    }

}