var schedule = require('node-schedule');
const db = require('../db-connector');
const gpio = require('../gpio-connector');
const relayMap = {};
const durationMap = {
    'minutes': 1000 * 60
};

const scheduledJobs = [];
async function InitialiseSchedule() {
    const result = await db.ExecuteQuery(`select * from iotDb.relayschedule`);
    let list = gpio.GetRelayList();
    list.forEach((element, idx) => {
        relayMap[`Relay${idx+1}`] = element;
    });
    if (result[0].ScheduleData) {
        _parseCalendarEvents(JSON.parse(result[0].ScheduleData));
    }
}

function HandleEvent(data) {
    console.log(`Event Occured ${Date.now()}`);
    console.log(`Data at HandleEvent stage is ${JSON.stringify(data)}`);
    gpio.SetRelayState(relayMap[data.relayInformation.relay], data.relayInformation.relayState);
    setTimeout(function() {
        gpio.SetRelayState(relayMap[data.relayInformation.relay], !data.relayInformation.relayState);
    }, durationMap[data.duration.durationUnit] * data.duration.duration);

}

function ScheduleAllJobs(schedule) {
    _cancelAllJobs();
    _parseCalendarEvents(JSON.parse(schedule));
}

function _scheduleJobs(date, method, data) {
    if (date > Date.now()) {
        console.log(`Data at binding stage is ${JSON.stringify(data)}`);
        scheduledJobs.push(schedule.scheduleJob(date, method.bind(null, data)));
    } else {
        console.log(`Date ${date} with data ${JSON.stringify(data)} is in the past`);
    }
}

function _cancelAllJobs() {
    scheduledJobs.forEach(job => {
        job.cancel();
    });
    scheduledJobs.length = 0;
}

function _parseCalendarEvents(calendar) {
    console.log(calendar);
    if (calendar.events && calendar.events.length > 0) {
        calendar.events.forEach(element => {
            if (element.schedule) {
                let event = element.schedule;
                let year = `${event.year[0]}`;
                let month = `${event.month[0]+1}`.padStart(2, '0');
                let day = `${event.dayOfMonth[0]}`.padStart(2, '0');
                let dateString = `${year}-${month}-${day}`;
                if (event.times && event.times[0]) {
                    let hour = `${event.times[0]}`;
                    dateString += `T${hour}:00`;
                }
                let duration = { duration: event.duration, durationUnit: event.durationUnit };
                let relayInformation = { relay: element.data.relays, relayState: element.data.relayState };
                let dataPayload = { duration: duration, relayInformation: relayInformation };
                const eventDate = new Date(dateString);
                _scheduleJobs(eventDate, HandleEvent, dataPayload);
            }
        });
    }
}

module.exports = {
    ScheduleAllJobs: ScheduleAllJobs,
    InitialiseSchedule: InitialiseSchedule
}