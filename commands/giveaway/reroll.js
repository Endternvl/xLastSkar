const { Client, Message } = require("discord.js");

module.exports = {
  name: "reroll",
  description: "reroll a starting giveaway",
  cooldown: 5000,
   /**
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
        ":x: You need to have the manage messages permissions to reroll giveaways."
      );
    }

    // If no message ID or giveaway name is specified
    if (!args[0]) {
      return message.channel.send(
        ":x: You have to specify a valid message ID!"
      );
    }

    // try to found the giveaway with prize then with ID
    let giveaway =
      // Search with giveaway prize
      client.giveawaysManager.giveaways.find(
        (g) => g.prize === args.join(" ")
      ) ||
      // Search with giveaway ID
      client.giveawaysManager.giveaways.find((g) => g.messageID === args[0]);

    // If no giveaway was found
    if (!giveaway) {
      return message.channel.send(
        "Unable to find a giveaway for `" + args.join(" ") + "`."
      );
    }

    // Reroll the giveaway
    client.giveawaysManager
      .reroll(giveaway.messageID)
      .then(() => {
        // Success message
        message.channel.send("Giveaway rerolled!");
      })
      .catch((e) => {
        if (
          e.startsWith(
            `Giveaway with message ID ${giveaway.messageID} is not ended.`
          )
        ) {
          message.channel.send("This giveaway is not ended!");
        } else {
          console.error(e);
          message.channel.send("An error occured...");
        }
      });
  },
};
