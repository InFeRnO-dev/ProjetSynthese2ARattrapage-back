const BaseDAO = require('./basedao')

module.exports = class StatutDAO extends BaseDAO {

    constructor(db) {
        super(db, "statut")
    }

    getAllStatut(){
        return new Promise((resolve, reject) =>
        this.db.query("SELECT * FROM public.statut ORDER BY id_statut ASC")
            .then(res => {resolve(res.rows)})
            .catch(e => {reject(e)}))
    }

    insert(id_statut, label) {
        return this.db.query("INSERT INTO public.statut(id_statut, label) VALUES ($1,$2)",
            [id_statut, label])
    }

}