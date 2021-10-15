const { Client, Message, MessageEmbed } = require("discord.js");
const db = require("quick.db");
const sr = require("../../mores/error"),
  sd = require("../../mores/success"),
  { default_prefix } = require("../../config.json");

module.exports = {
  name: "setprefix",
  aliases: ["prefix", "setnewprefix"],
  description: "Change the guild bot prefix to another prefix that you enter",
  usage: "[New Prefix]",
  cooldown: 10000,
  permission: ['MANAGE_GUILD', 'MANAGE_CHANNEL'],
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    try {
      const epix = await db.get(`prefix_${message.guild}`)
      if (args[0] === epix) return sr('The prefix u entered is already setted as this guild\'s prefix... ', message.channel)
      if (!args[0])
        return sr("Please enter a prefix to set...!", message.channel);
      if (args[1])
        return sr("Prefix cannot setted as 2 arguments !", message.channel);
      if (args[0].length > 5)
        return sr(
          "Prefix cannot setted more than 5 letters... !",
          message.channel
        );
      if (
        args.join("") === default_prefix ||
        args[0].toLowerCase() === "reset"
      ) {
        db.delete(`prefix_${message.guild}`);
        return await message.channel.send({
          embeds: [
            new MessageEmbed({
              description:
                "Prefix was resetted / back to default prefix (`xl`)",
              color: "BLURPLE",
              footer: "Prefix was resetted",
            }),
          ],
        });
      }
      db.set(`prefix_${message.guild}`, args[0]);
      await message.channel.send({
        embeds: [
          new MessageEmbed({
            title: `Prefix Settings`,
            description: `Server prefix was changed and setted to \`${args[0]}\``,
            color: `BLURPLE`,
          }),
        ],
      });
    } catch {
      return undefined;
    }
  },
};
