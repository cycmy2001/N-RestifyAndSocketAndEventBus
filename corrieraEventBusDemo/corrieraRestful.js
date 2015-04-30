
var restify = require('restify');
var co = require('co');
var events = require('events');
var singleton = require('./../common/singleton');

function respond(req, res, next) {
    var imei = req.params.imei;
    var eventBusFrom = new singleton.corrieraEventBus.From();
    var eventBusTo = new singleton.corrieraEventBus.To();

    eventBusFrom.emit(imei, 'CKR2S', 'CK');
    console.log('req.imei==' + imei);


    var emitter = new events.EventEmitter();
    var timeoutEventId = setTimeout(function () {
        emitter.emit('timeout', { message: 'have been timeout...' });
    }, 3000);
    emitter.on('timeout', function (data) {
        //once无需使用，on方法是使用
        //eventBusTo.removeListener(imei, function(){console.log('asdf')});
        res.send('hello timeout');
    });

    var handleSocket2Rest = function handleSocket2Rest(data) {
        clearTimeout(timeoutEventId);
        console.log('subcribe event ebSocket2Rest data:' + data);
        res.send('hello ' + data);

    };
    eventBusTo.once(imei, /^CKS2R*/,handleSocket2Rest);
    console.log('already register eventbus ebSocket2Rest');

}
var server = restify.createServer();
server.get('/imei/:imei', respond);
//http://localhost:3900/imei/1234567890

module.exports = server;