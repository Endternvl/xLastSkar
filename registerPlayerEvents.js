const { Message, MessageEmbed } = require("discord.js")

/**
 * 
 * @param { Message } message
 */

const emojiArray = [
    'https://cdn.discordapp.com/attachments/880667300968144918/895152414154440704/3403-music-notes.gif',
    'https://cdn.discordapp.com/attachments/880667300968144918/895153740284305408/6115-dance.gif'
] // you can add emoji here! (must be a link!)

module.exports.registerPlayerEvents = (player, message) => {
    player.on("error", async (queue, error) => {
        console.log(`[${queue.guild.name}] Error emitted from the queue: ${error.message}`)
    });

    player.on("connectionError", (queue, error) => {
        console.log(`[${queue.guild.name}] Error emitted from the connection: ${error.message}`);
    });

    player.on("trackStart", (queue, track) => {
        message.channel.send({ embeds: [ new MessageEmbed().setAuthor('**Track Started**', `${emojiArray[Math.floor(Math.random() * emojiArray.length)]}`).setDescription(`*Track Name:* ${track.name} *On:* ${queue.connection.channel.name}`).setColor("RANDOM") ] }).catch(() => undefined)
    });

    player.on("trackAdd", (queue, track) => {
        message.channel.send(`🎶 | Track **${track.title}** queued!`);
    });

    player.on("botDisconnect", (queue) => {
        queue.metadata.send("❌ | I was manually disconnected from the voice channel, clearing queue!");
    });

    player.on("channelEmpty", (queue) => {
        queue.metadata.send("❌ | Nobody is in the voice channel, leaving...");
    });

    player.on("queueEnd", (queue) => {
        queue.metadata.send("✅ | Queue finished!");
    });
}