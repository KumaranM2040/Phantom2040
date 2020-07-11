var schedule = require('node-schedule');
const db = require('../db-connector');
const gpio = require('../gpio-connector');
const relayMap = {};
const durationMap = {
    'Minutes': 1000 * 60
};

const scheduledJobs = [];
async function InitialiseSchedule() {
    const result = await db.ExecuteQuery(`select * from iotDb.relayschedule`);
    let list = gpio.GetRelayList();
    list.forEach((element, idx) => {
        relayMap[`Relay${idx+1}`] = element;
    });
    if (result[0].ScheduleData) {
        ParseCalendarEvents(JSON.parse(result[0].ScheduleData));
    }
}

function ScheduleJobs(date, method, data) {
    if (date > Date.now()) {
        scheduledJobs.push(schedule.scheduleJob(date, method.bind(null, data)));
    } else {
        console.log(`Date ${date} with data ${JSON.stringify(data)} is in the past`);
    }
}

function HandleEvent(data) {
    console.log('Event Occured', Date.now());
    gpio.SetRelayState(relayMap[data.relayInformation.relay], data.relayInformation.relayState);
    setTimeout(function() {
        gpio.SetRelayState(relayMap[data.relayInformation.relay], !data.relayInformation.relayState);
    }, durationMap[data.duration.durationUnit] * data.duration.duration);

}

function ParseCalendarEvents(calendar) {
    console.log(calendar);
    if (calendar.events && calendar.events.length > 0) {
        calendar.events.forEach(element => {
            let event = element.schedule;
            let year = `${event.year[0]}`;
            let month = `${event.month[0]+1}`.padStart(2, '0');
            let day = `${event.dayOfMonth[0]}`.padStart(2, '0');
            let hour = `${event.times[0]}`;
            let dateString = `${year}-${month}-${day}T${hour}:00`;
            let duration = { duration: event.duration, durationUnit: event.durationUnit };
            let relayInformation = { relay: element.data.relays, relayState: element.data.relayState };
            let dataPayload = { duration: duration, relayInformation: relayInformation };
            const eventDate = new Date(dateString);
            ScheduleJobs(eventDate, HandleEvent, dataPayload);
        });
    }
}

module.exports = {
    ScheduleJobs: ScheduleJobs,
    InitialiseSchedule: InitialiseSchedule
}