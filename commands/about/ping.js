const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
    name: "ping",
    description: "Returns The Websocket Of xTypeSkar",
    cooldown: 5000,
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */

    run: async (client, message, args) => {
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
        message.reply({ embeds: [ new MessageEmbed({
            title: '🏓 Pong',
            description: `Websocket \`${theping}\``,
            color: "YELLOW",
        }) ] });
    },
};