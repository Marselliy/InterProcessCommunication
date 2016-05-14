var api = {};
global.api = api;
api.net = require('net');

var socket = new api.net.Socket();
var id;
socket.connect({
  port: 2000,
  host: '127.0.0.1',
}, function() {
  socket.on('data', function(data) {
    console.log('Data received (by client): ' + data);
    id = JSON.parse(data)['id'];
    send_data = JSON.stringify({id : id, data : JSON.parse(data)['data'].map(function(el){return el * 2;})});
    socket.write(send_data);
    console.log('Data sent (by client): ' + send_data);
  });
  socket.on('error', function(data) {
    console.log('Error: ' + data['code']);
  })
});
