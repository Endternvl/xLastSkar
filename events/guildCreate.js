const client = require('../xlast');

client.on('guildCreate', guild => {
    guild.fetchAuditLogs({ type: "BOT_ADD", limit: 1 }).then(log => {
        let athing = client.guilds.cache.size;
        let guilds;
        if (athing > 1) {
            guilds = `${athing} Servers`
        } else {
            guilds = `${athing} Server`
        }
        const inviter = log.entries.first().executor;
        var chx = guild.channels.cache.filter(chx => chx.type === "text").find(x => x.position === 0)
        const thankEmbed = new MessageEmbed()
          .setColor('RANDOM')
          .setTitle('Hello!')
          .setDescription(`I'am ${client.user.username}. I am a multi-configurated discord bot that you can use to moderate your discord server to even better server. check me out, check me out!`)
          .addField('**Informations**', `**__Name/Tag:__** \`${client.user.tag}\`\n**__Currently On:__**\n\`${guilds}\`\n\`${client.users.cache.size} Users\`\n**__Prefixes:__** \`xl/<@${client.user.id}>\`*Pro tip: Prefix are changeable*\n**__Commands:__**\n\`${client.commands.cache.size} Default Commands\`\n\`${client.slashCommands.cache.size} Slash Commands\`\n\`Total Of: ${client.commands.cache.size + client.slashCommands.cache.get} Commands\``)
          .setTimestamp();
    
        chx.send({ embeds: [ thankEmbed ] })
    }).catch((err) => undefined)
});