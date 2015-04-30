exports.cobuEventBus = {
    From:function(){
        return require('./cobuEventBusFrom');
    },
    To:function(){
        return require('./cobuEventBusTo');
    }
};
exports.corrieraEventBus = {
    From:function(){
        return require('corriera');
    },
    To:function(){
        return require('corriera');
    }
};