var co = require("co");
var restful = require('./corrieraRestful');
var netServer = require('./corrieraNetServer');
var httpsvrclt = require('./../http-svr-clt');


co(function () {
    restful.listen(3900, function () {
        console.log('%s listening at %s', restful.name, restful.url);
    });
    return 'restful is start'

}).then(function (value) {

    console.log(value);
    netServer.listen(8099, function () {
        console.log('Server listening on ' + netServer.address().address + ':' + netServer.address().port);
    });
    return 'socket server is start'

}).then(function (value) {
    console.log(value);

    httpsvrclt.listen(3000, function () {
        console.log('http Server listening on ' + httpsvrclt.address().address + ':' + httpsvrclt.address().port);
    });



}, function (err) {
    console.error(err.stack);
});








