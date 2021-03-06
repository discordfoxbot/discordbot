let eris = require('../lib/client');
let lang = require('../lib/lang');
let cache = require('../lib/cache');

module.exports = {
    label: 'nick',
    enabled: true,
    isSubcommand: false,
    generator: (msg, args)=> {
        let guild = cache.getGuild(msg.channel.guild.id);
        if (guild.getRole(msg.author.id) > 2) {
            let nick = (args.join(' ').trim() !== 'reset' ? args.join(' ').trim() : eris.user.username);
            eris.editNickname(msg.channel.guild.id, nick).then(()=> {
                msg.channel.createMessage(lang.computeResponse(msg, 'nick.default'));
            });
        } else msg.channel.createMessage(lang.computeResponse(msg, 'no_permission', {
            required: 3,
            have: guild.getRole(msg.author.id) || 0
        }));
        return false;
    },
    options: {
        caseInsensitive: true,
        deleteCommand: true,
        guildOnly: true
    },
    subcommands: [require('./nick_global')]
};