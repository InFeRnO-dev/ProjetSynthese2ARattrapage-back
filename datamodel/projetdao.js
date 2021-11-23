const BaseDAO = require('./basedao')

module.exports = class ProjetDAO extends BaseDAO {

    constructor(db) {
        super(db, "projet")
    }

    getProjetByIdStatutIdClient(id_user, id_client, id_statut){
        if(id_statut !== '0' && id_client === '0'){
            return new Promise((resolve, reject) =>
            this.db.query(`SELECT pr.id_projet, pr.nom, pr.id_statut, st.label, pr.id_client, cl.nom as nom_client, cl.id_user FROM public.projet pr
                           LEFT JOIN public.client cl on cl.id_client = pr.id_client
                           LEFT JOIN public.statut st on st.id_statut = pr.id_statut
                           LEFT JOIN public.user us on us.id_user = cl.id_user
                           WHERE cl.id_user = $1 AND pr.id_statut = $2
                           `,[id_user, id_statut])
            .then(res => {resolve(res.rows)})
            .catch(e => {reject(e)}))
        }
        else if(id_client !== '0' && id_statut === '0'){
            return new Promise((resolve, reject) =>
            this.db.query(`SELECT pr.id_projet, pr.nom, pr.id_statut, st.label, pr.id_client, cl.nom as nom_client, cl.id_user FROM public.projet pr
                           LEFT JOIN public.client cl on cl.id_client = pr.id_client
                           LEFT JOIN public.statut st on st.id_statut = pr.id_statut
                           LEFT JOIN public.user us on us.id_user = cl.id_user
                           WHERE cl.id_user = $1 AND pr.id_client = $2
                           `,[id_user, id_client])
            .then(res => {resolve(res.rows)})
            .catch(e => {reject(e)}))
        }
        else if(id_statut === '0' && id_client === '0'){
            return new Promise((resolve, reject) =>
            this.db.query(`SELECT pr.id_projet, pr.nom, pr.id_statut, st.label, pr.id_client, cl.nom as nom_client, cl.id_user FROM public.projet pr
                           LEFT JOIN public.client cl on cl.id_client = pr.id_client
                           LEFT JOIN public.statut st on st.id_statut = pr.id_statut
                           LEFT JOIN public.user us on us.id_user = cl.id_user
                           WHERE cl.id_user = $1
                           `,[id_user])
            .then(res => {resolve(res.rows)})
            .catch(e => {reject(e)}))
        }
        else {
            return new Promise((resolve, reject) =>
            this.db.query(`SELECT pr.id_projet, pr.nom, pr.id_statut, st.label, pr.id_client, cl.nom as nom_client, cl.id_user FROM public.projet pr
                           LEFT JOIN public.client cl on cl.id_client = pr.id_client
                           LEFT JOIN public.statut st on st.id_statut = pr.id_statut
                           LEFT JOIN public.user us on us.id_user = cl.id_user
                           WHERE cl.id_user = $1 AND pr.id_client = $2 AND pr.id_statut = $3
                           `,[id_user, id_client, id_statut])
            .then(res => {resolve(res.rows)})
            .catch(e => {reject(e)}))
        }
    }

    insert(nom, id_statut, id_client) {
        return this.db.query("INSERT INTO public.projet(nom, id_statut, id_client) VALUES ($1,$2,$3)",
            [nom, id_statut, id_client])
    }

    update(nom, id_statut, id_client, id_projet) {
        return this.db.query("UPDATE public.projet SET nom = $1, id_statut = $2, id_client = $3 WHERE id_projet = $4",
            [nom, id_statut, id_client, id_projet])
    }

    delete(id_projet) {
        return this.db.query("DELETE FROM public.projet WHERE id_projet = $1",
            [id_projet])
    }

}