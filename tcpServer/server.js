var api = {};
global.api = api;
api.net = require('net');

var work = [32, 2, 4, 54, 3, 6, 17, 24];
var result = [];
var users = [];
var user_count = 2;
var resp_count;

var server = api.net.createServer(function(socket) {
  users.push(socket);
  console.log('Connected: ' + socket.localAddress);
  if (users.length == user_count) {
    for (var i = 0; i < users.length; i++) {
      data = JSON.stringify({id : i, data : work.slice(i * work.length / user_count, (i + 1) * work.length / user_count)});
      users[i].write(data);
      console.log('Data sent (by server): ' + data);
    }
    resp_count = user_count;
  }
  socket.on('data', function(data) {
    console.log('Data received (by server): ' + data);
    id = JSON.parse(data)['id'];
    arr = JSON.parse(data)['data'];
    for (var i = id * work.length / user_count; i < id * work.length / user_count + arr.length; i++) {
      result[i] = arr[i - id * work.length / user_count];
    }
    resp_count--;
    if (resp_count == 0)
      console.log('Result: ' + result);
  });
  socket.on('error', function(data) {
    console.log('Error: ' + data['code']);
  })
}).listen(2000);
