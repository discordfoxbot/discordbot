let db = require('../lib/db');

module.exports = {
    event: 'messageDelete',
    enabled: true,
    handler: (msg)=> {
       /* if (msg)*/ db.models.Message.update({deleted: true}, {where: {mid: msg.id}});
    }
};