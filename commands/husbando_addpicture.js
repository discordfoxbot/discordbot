let Promise = require('bluebird');
let validator = require('validator');

let db = require('../lib/db');
let lang = require('../lib/lang');
let utils = require('../lib/utils');
let cch = require('../lib/cache');

module.exports = {
    label: 'addpicture',
    enabled: true,
    isSubcommand: true,
    generator: (msg, args)=> {
        if (args.length === 0 || args.length > 2) {
            //todo send args err
            console.log(1);
        } else {
            Promise.resolve().then(()=> {
                if (args.length === 2) {
                    if (!validator.isURL(args[0]) && validator.isURL(args[1])) {
                        return Promise.resolve(args[0]);
                    } else {
                        return Promise.reject();
                    }
                } else {
                    return db.models.User.find({where: {uid: msg.author.id}}).then((user)=> {
                        return user.getHusbando().then((husbando)=> {
                            if (husbando !== null && husbando !== undefined) return Promise.resolve(husbando);
                            else return Promise.reject();
                        });
                    });
                }
            }).then((husbando)=> {
                return utils.uploadFile(args[args.length - 1]).then((url)=> {
                    return husbando.createCharacterPicture({
                        link: url,
                        verified: (fcache.getGlobalUserPerm(msg.author.id) > 5)
                    }).then(()=> {
                        msg.channel.createMessage(lang.computeResponse(msg, 'husbando.createPicture.default'));
                    });
                });
            }).catch((err)=> {
                console.log(err);
                //todo send error
            });
        }
    },
    options: {
        deleteCommand: true,
        caseInsensitive: true
    }
};