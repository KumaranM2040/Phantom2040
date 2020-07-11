const gpio = require("./gpio-connector");

function gpioInitialise() {
    return new Promise(function(resolve, reject) {
        const relays = gpio.InitialiseRelayGpio();
        if (relays) {

            const io = require("socket.io")(global.nodeserver);
            const relayMap = {};
            relays.forEach((element, index) => {
                relayMap[`btnRelay${index+1}`] = element;
            });
            var GPIOControllerSocket = io.of("/gpio-socket");
            GPIOControllerSocket.on("connection", function(socket) {
                console.log(
                    "A new gpio-socket WebSocket namespace client connected with ID: " +
                    socket.client.id);
                socket.on("GPIO", function(msg, fn) {
                    if (msg.toggle === true) {
                        let result = gpio.ToggleRelayState(relayMap[msg.relay]);
                        fn(msg.relay, result === 1 ? "ON" : "OFF");
                        socket.emit("relayState", {
                            relay: msg.relay,
                            state: result === 1 ? "ON" : "OFF"
                        });
                    } else {
                        let result = gpio.QueryRelayState(relayMap[msg.relay]);
                        fn(msg.relay, result === 1 ? "ON" : "OFF");
                    }
                });
            });
            resolve();
        } else {
            const io = require("socket.io")(global.nodeserver);

            var GPIOControllerSocket = io.of("/gpio-socket");
            GPIOControllerSocket.on("connection", function(socket) {
                socket.on("GPIO", function(msg, fn) {
                    socket.emit("relayState", {
                        relay: msg.relay,
                        state: "OFF"
                    });
                });
            });

            resolve();
        }
    });
}

module.exports = gpioInitialise;