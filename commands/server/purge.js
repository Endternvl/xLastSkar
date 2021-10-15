const { Client, Message, MessageEmbed } = require("discord.js");
const ms = require("ms");

module.exports = {
  name: "purge",
  description: "Clears some messages that provided",
  aliases: ["clear"],
  usage: "[ Number ]",
  botPermissions: ["MANAGE_MESSAGES"],
  permissions: ["MANAGE_MESSAGES"],
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const amount = Number(args[0]) || parseInt(args[0]);

    if (isNaN(amount) || !Number.isInteger(amount) || !amount)
      return message.reply({ content: "Enter amount of number" });

    if (amount > 150) return message.reply({ content: "Max number is 150" });

    const messages = await message.channel.messages.fetch({
      limit: amount + 1,
    });

    const filtered = messages.filter(
      (msg) => Date.now() - msg.createdTimestamp < ms("14 days")
    );

    await message.channel.bulkDelete(filtered);

    message.channel
      .send({
        content: `Deleted ${filtered.size - 1} messages`,
      })
      .then((msg) => {
        setTimeout(() => msg.delete(), 3000);
      });
  },
};
