const DashboardDAO = require("../datamodel/dashboarddao")

module.exports = class DashboardService {
    constructor(db) {
        this.dao = new DashboardDAO(db)
    }

    getCAannuel(id_user, datedebut, datefin){
        return this.dao.getCAannuel(id_user, datedebut, datefin)
    }

    getPaiementsAttente(id_user, datedebut, datefin){
        return this.dao.getPaiementsAttente(id_user, datedebut, datefin)
    }

    getAFacturer(id_user, datedebut, datefin){
        return this.dao.getAFacturer(id_user, datedebut, datefin)
    }
}