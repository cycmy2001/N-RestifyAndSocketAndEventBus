var cobu = require('cobu-eventbus');
var eventBus = new cobu.EventBus();
module.exports = {
    getEventBus: function() {
        return eventBus;
    }
};