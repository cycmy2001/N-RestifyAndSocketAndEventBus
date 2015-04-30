var net = require('net');
var BufferStream = require('bufferstream');
var singleton = require('./../common/singleton');


var server = net.createServer();
server.on('connection', function (sock) {

    var eventBusFrom = new singleton.corrieraEventBus.From();
    var eventBusTo = new singleton.corrieraEventBus.To();

    var isRegister = false;

    var stream = new BufferStream([{ encoding: 'utf8', size: 'none' }]);
    stream.split('#', '#');
    stream.on('split', function (chunk, token) {
        console.log("got '%s' by '%s'", chunk.toString(), token.toString());
        var IMEI = '1234567890';
        if(isRegister === false){
            var eventBusHandle = function handleCk(data) {
                console.log('restify send data='+data);
            };
            // '/^CKR2S$/'：正则表达式
            eventBusFrom.once(IMEI, /^CKR2S$/,eventBusHandle);
            isRegister = true;
            console.log('already register eventbus');
        }else{
            eventBusTo.emit(IMEI, 'CKS2R', 'CK response');
            console.log('eventBus.ebSocket2Rest.post');
        }
    });
    //stream.on('data', function (chunk) {
    //    console.log("got data '%s'", chunk.toString());
    //
    //});

    console.log('CONNECTED: ' + sock.remoteAddress + ':' + sock.remotePort);
    sock.on('data', function (data) {
        console.log('DATA =' + data);
        stream.write(data);

    });
    sock.on('close', function () {
        console.log('CLOSED ');
    });


});

module.exports = server;