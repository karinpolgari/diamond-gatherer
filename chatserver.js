const express = require('express');
const app = express();
const http = require ('http').createServer(app);
const serv2 = require('socket.io')(http);

 http.listen(5050, function() {
    console.log('[SERVER STARTED AT PORT 5050]');
})
app.get('/', function(request,response) {
    console.log(__dirname);
   response.sendFile(__dirname + '/index.html');
})

app.use(express.static(__dirname + '/public'));

serv2.on('connection', function(socket) {
    console.log('[SOCKET CONNECTED]' + socket.id); 
})