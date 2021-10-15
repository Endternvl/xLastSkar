const { Client, CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "ping",
    description: "Returns The Websocket Of xTypeSkar",
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */

    run: async (client, interaction, args) => {
        let theping;
        let millsecs = client.ws.ping;
        if (millsecs > 1000) {
            theping = `${millsecs} Seconds`
        } else {
            theping = `${millsecs} Millseconds`
        }
        if (millsecs === 3600000) {
            theping = `${millsecs} Hour`
        }
        if (millsecs > 3600000) {
            theping = `${millsecs} Hours+`
        }
        interaction.followUp({ embeds: [ new MessageEmbed({
            title: '🏓 Pong',
            description: `Websocket \`${theping}\``,
            color: 'DARK_RED',
        }) ] });
    },
};