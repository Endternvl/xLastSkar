const { Client, Message, MessageEmbed } = require("discord.js");
const sendError = require("../../mores/error");
const sendDone = require("../../mores/success");
const warnModel = require("../../models/warnModel");

module.exports = {
  name: "warn",
  description: "Warns a user.",
  usage: "[USER] [REASON]",
  cooldown: 5000,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    message.delete();
    const user =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);
    const reason = args.slice(1).join(' ');
    if (!message.member.permissions.has("MANAGE_MESSAGES"))
      return sendError(
        "You need the following permission: ['MANAGE_GUILD']",
        message.channel
      );
    if (!user) return message.reply({ content: "Please enter a member" });
    if (user === message.author)
      return message.reply("I Cannot warn your-self!");
    if (!reason) return sendError('Please enter a reason to warn', message.channel)
    if (user.roles.highest.position === message.member.roles.highest.position)
      return sendError(
        "Mentioned User Is Having A Higher Role Than Yours.",
        message.channel
      );
    if (reason.length > 32)
      return sendError(
        "Reason cannot be more than 32 length.",
        message.channel
      );
      const datenow = Date.now();
    new warnModel({
      userId: user.id,
      guildId: message.guildId,
      moderatorId: message.author.id,
      reason,
      timestamp: Math.floor(datenow / 1000)
    }).save();
    user
      .send({
        content: `You have been **WARNED** in ${message.guild.name} for **\`${reason}\`**`,
      })
      .catch(() => undefined);
    sendDone(`Warned <@${user.id}> for reason: \`${reason}\``, message.channel).catch((error) => console.log(error));
  },
};
