var net = require('net');
var http = require('http');
var fs = require('fs');
var socketio = require('socket.io');

var server = http.createServer(function (req, res) {
    var txt = fs.readFileSync('./client.html');
    res.end(txt);
});

var sio = socketio.listen(server);
var namespaces = {
    chat_spaces: sio.of('/chat')
};
namespaces.chat_spaces.on("connection",function(socket){
    var netClient = getDataStream(socket, 8099);
    socket.on("disconnect",function(){
        netClient.destroy();
    });
    socket.on('message', function (msg) {
        console.log('Message Received: ', msg);
        netClient.write(msg);
    });
});

function getDataStream(socket, port) {
    var dataStream = net.createConnection(port);
    dataStream.setEncoding("utf8");
    dataStream.setKeepAlive(true);

    dataStream.on('error', function(error){
        socket.emit('tcp_error',{message:"Data Connection Error "+ error});
    });

    dataStream.on('connect', function(){
        socket.emit('tcp_connected',{message:"Data Source Connected"});
    });

    dataStream.on('timeout', function(){
        socket.emit('tcp_timeout',{message:"timeout"});
    });

    dataStream.on('data', function(data) {
        socket.emit('tcp_data', data);
    });
    return dataStream;
}

module.exports = server;