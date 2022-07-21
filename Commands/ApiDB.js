const MySqlConnector = require('../src/MySqlConnector')

MySqlConnector.connect();


const bdd = {
    getClassement(sportName, callback) {
        let classement = await MySqlConnector.executeQuery("SELECT (id_Sportif_top1,id_Sportif_top2,id_Sportif_top3) FROM sports WHERE Sport_Name = " + sportName);
        callback(classement);
    }
}
module.exports = { bdd }