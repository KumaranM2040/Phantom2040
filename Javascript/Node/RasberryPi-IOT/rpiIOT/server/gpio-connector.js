const Gpio = require("onoff").Gpio;
const relayMap = {};

function InitialiseRelayGpio() {

    if (Gpio.accessible) {
        relayMap['relayGPIO1'] = new Gpio(17, "out");
        relayMap['relayGPIO2'] = new Gpio(27, "out");
        relayMap['relayGPIO3'] = new Gpio(10, "out");
        relayMap['relayGPIO4'] = new Gpio(11, "out");
        return Object.keys(relayMap);
    }
    return false;
}

function GetRelayList() {
    return Object.keys(relayMap);
}

function QueryRelayState(key) {
    return relayMap[key].readSync();
}

function SetRelayState(key, on) {
    relayMap[key].writeSync(on ? 1 : 0);
}

function ToggleRelayState(key) {
    SetRelayState(key, QueryRelayState(key) ^ 1);
    return QueryRelayState(key);
}

module.exports = {
    InitialiseRelayGpio: InitialiseRelayGpio,
    QueryRelayState: QueryRelayState,
    SetRelayState: SetRelayState,
    ToggleRelayState: ToggleRelayState,
    GetRelayList: GetRelayList
}