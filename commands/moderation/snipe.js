const { Message, Client, MessageEmbed } = require("discord.js");
const moment = require("moment");
const ser = require("../../mores/error");

module.exports = {
  name: "snipe",
  description: "Get a deleted message on a channel",
  cooldown: 10000,

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */

  run: async (client, message, args) => {
    if (!message.member.permissions.has("MANAGE_GUILD" || "MANAGE_MESSAGES"))
      return ser(
        "You need a `MANAGE_GUILD` or `MANAGE_MESSAGES` permission to use this command!",
        message.channel
      );

    const snipes = client.snipe.get(message.guild);
    if (!snipes)
      return message.channel.send({
        embeds: [
          new MessageEmbed()
          .setAuthor(
            `${message.author.username.split(0, 8)}`,
            message.author.displayAvatarURL({ dynamic: true })
          )
          .setDescription(
            `There are no deleted message currently! i can only get deleted message when i am online`
          )
          .setFooter(`${moment(message.createdAt).fromNow()} | 0 / 0`)
          .setColor("RANDOM"),
        ],
      });

    const snipe = +args[0] - 1 || 0;
    const target = snipes[snipe];
    if (!target)
      return message.reply(`There is only ${snipes.length} messages!`);

    const { msg, time, image, channel } = target;
    message.channel.send({
      embeds: [
        new MessageEmbed()
          .setAuthor(msg.author.tag, msg.author.displayAvatarURL())
          .setImage(image)
          .setDescription(`${msg.content}\n\n`)
          .addField('_**Message Data**_', [
            `**Message Id**: ${msg.id}`,
            `**Channel:** ${channel}`,
          ].join("\n"))
          .setFooter(
            `${moment(time).fromNow()} | ${snipe + 1} / ${snipes.length}`
          )
          .setColor("RANDOM"),
      ],
    });
  },
};
