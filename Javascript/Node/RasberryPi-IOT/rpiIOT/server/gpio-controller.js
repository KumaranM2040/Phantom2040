const Gpio = require("onoff").Gpio;

function gpioInitialise() {
  return new Promise(function(resolve, reject) {
    if (Gpio.accessible) {
      const relayGPIO1 = new Gpio(17, "out");
      const relayGPIO2 = new Gpio(27, "out");
      const relayGPIO3 = new Gpio(10, "out");
      const relayGPIO4 = new Gpio(11, "out");

      const io = require("socket.io")(global.nodeserver);

      var GPIOControllerSocket = io.of("/gpio-socket");
      resolve();
      function toggleRelay(relay) {
        relay.writeSync(relay.readSync() ^ 1);
        return relay.readSync();
      }
      GPIOControllerSocket.on("connection", function(socket) {
        console.log(
          "A new gpio-socket WebSocket namespace client connected with ID: " +
            socket.client.id,
          socket.client
        );
        socket.on("GPIO", function(msg, fn) {
          console.log(msg);
          if (msg.toggle === true) {
            let result = 0;
            switch (msg.relay) {
              case "btnRelay1":
                result = toggleRelay(relayGPIO1);
                break;
              case "btnRelay2":
                result = toggleRelay(relayGPIO2);
                break;
              case "btnRelay3":
                result = toggleRelay(relayGPIO3);
                break;
              case "btnRelay4":
                result = toggleRelay(relayGPIO4);
                break;
            }

            fn(msg.relay, result === 1 ? "ON" : "OFF");
            socket.emit("relayState", {
              relay: msg.relay,
              state: result === 1 ? "ON" : "OFF"
            });
            console.log(result);
          } else {
            let result = 0;
            switch (msg.relay) {
              case "btnRelay1":
                result = relayGPIO1.readSync();
                break;
              case "btnRelay2":
                result = relayGPIO2.readSync();
                break;
              case "btnRelay3":
                result = relayGPIO3.readSync();
                break;
              case "btnRelay4":
                result = relayGPIO4.readSync();
                break;
            }
            fn(msg.relay, result === 1 ? "ON" : "OFF");
          }

          console.log(msg);
        });
      });
    } else {
        resolve();
    }
  });
}

module.exports = gpioInitialise;