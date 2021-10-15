const ms = require("ms");
const { Client, Message } = require("discord.js");

module.exports = {
  name: "end",
  description: "end a current starting giveaway.",
  cooldown: 5000,
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args
     */
  run: async (client, message, args) => {
    let gwrole = await client.data.fetch(`giveawayrole_${message.guild.id}`);
    let givrole;
    givrole = gwrole
    if (
      !message.member.permissions.has("MANAGE_MESSAGES") &&
      !message.member.roles.cache.get(givrole)
    ) {
      return message.channel.send(
        "You don't have permission (`MANAGE_MESSAGES`) to end a giveaway!"
      );
    }

    // If no message ID or giveaway name is specified
    if (!args[0]) {
      return message.channel.send(
        "Please specify a valid mesasge ID!"
      );
    }

    // try to found the giveaway with prize then with ID
    const giveaway = 
            // Search with giveaway prize
            client.giveawaysManager.giveaways.find((g) => g.prize === args[0] && g.guildId === message.guild.id) ||
            // Search with giveaway ID
            client.giveawaysManager.giveaways.find((g) => g.messageId === args[0] && g.guildId === message.guild.id);

    // If no giveaway was found
    if (!giveaway) {
      return message.channel.send(
        "Unable to find a giveaway for `" + args.join(" ") + "`."
      );
    }
    if (giveaway.ended) {
      return message.reply({
          content: 'This giveaway is already ended!',
      });
  }
  client.giveawaysManager.end(giveaway.messageId)
  message.channel.send('Giveaway will end in less than '+(client.giveawaysManager.options.updateCountdownEvery/1000)+' seconds...')
  .then(() => {
    message.reply('Giveaway has been ended!');
  })
  },
};
