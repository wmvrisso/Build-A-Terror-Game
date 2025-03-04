const http = require('http').createServer();
const server = require('express')();
const io = require('socket.io')(http);

http.listen(3000, function () {
  console.log('server started ');
});