const db = require('../db-connector');
const scheduler = require('../util/scheduler');

async function getRelays(req, res, next) {
    if (req.session.IsAuthenticated) {
        const result = await db.ExecuteQuery(`select * from iotDb.relayschedule`);
        res.send({ saveState: result[0].ScheduleData });
    }
}

async function setRelays(req, res, next) {
    if (req.session.IsAuthenticated) {
        const result = await db.ExecuteQuery("UPDATE ?? SET `ScheduleData` = ?", ['iotDb.relayschedule', req.body.saveState]);
        console.log(result);
        scheduler.ScheduleAllJobs(req.body.saveState);
        res.status(200).end();
    }
}

module.exports = { getRelays, setRelays };