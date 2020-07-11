const db = require('../db-connector');

async function getRelays(req, res, next) {
    if (req.session.IsAuthenticated) {

        const result = await db.ExecuteQuery(`select * from iotDb.relayschedule`);
        res.send({ saveState: result[0].ScheduleData });
    }
}

async function setRelays(req, res, next) {
    if (req.session.IsAuthenticated) {
        console.log(JSON.stringify(req.body.saveState));
        const result = await db.ExecuteQuery("UPDATE ?? SET `ScheduleData` = ?", ['iotDb.relayschedule', req.body.saveState]);
        console.log(result);
    }
}

module.exports = { getRelays, setRelays };