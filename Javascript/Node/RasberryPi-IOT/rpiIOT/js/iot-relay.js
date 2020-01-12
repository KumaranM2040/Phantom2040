(function($){
    "use strict"; // Start of use strict
    var socket = io('http://'+location.hostname+':5000/gpio-socket');

    function updateRelayStatus(relay, status){
      console.log('updateRelayStatus');
      switch(relay){
        case 'btnRelay1':
          $('#Relay1State').text(status);
          break;
        case 'btnRelay2':
          $('#Relay2State').text(status);
          break;
        case 'btnRelay3':
          $('#Relay3State').text(status);
          break;
        case 'btnRelay4':
          $('#Relay4State').text(status);
          break;
      }
    }
    
    function onClickHandler(obj) {
      console.log(obj.target.id + ' has been hit');
      
      
      var result = socket.emit('GPIO', { relay: obj.target.id, toggle: true}, updateRelayStatus);
      console.log(result);
    }

    function readAllRelays(){
      var result = socket.emit('GPIO', { relay: 'btnRelay1', toggle: false}, updateRelayStatus);
      result |= socket.emit('GPIO', { relay: 'btnRelay2', toggle: false}, updateRelayStatus);
      result |= socket.emit('GPIO', { relay: 'btnRelay3', toggle: false}, updateRelayStatus);
      result |= socket.emit('GPIO', { relay: 'btnRelay4', toggle: false}, updateRelayStatus);
      console.log(result);
    }

    socket.on('relayState', function (data) {
      console.log('relayState ' + data);
      updateRelayStatus(data.relay, data.state);
    });

    $("button").click(onClickHandler);

    readAllRelays();

  })(jQuery);