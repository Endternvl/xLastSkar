const Schema = require("../../models/ghostping");
const sendError = require("../../mores/error");
const sendDone = require("../../mores/success");

module.exports = {
  name: "ghostping",
  description: "Enable/Disable Anti Ghost Ping",
  aliases: ["gp"],
  cooldown: 5000,
  usage: "[ENABLE/DISABLE]",
  permission: ['MANAGE_GUILD'],
  run: async (client, message, args) => {
    if (
      !message.channel.permissionsFor(message.guild.me).has(["SEND_MESSAGES"])
    )
      return message.member.send(
        `I do not have the permission \`MANAGE_SERVER\``
      );

    options = ["enable", "disable"];

    if (!args.length)
      return sendError(
        "Please enter either **enable** or **disable**",
        message.channel
      );
    const opt = args[0].toLowerCase();
    if (!opt)
      return sendError(
        "Please enter either **enable** or **disable**",
        message.channel
      );

    if (!options.includes(opt))
      return sendError(
        "Please enter either **enable** or **disable**",
        message.channel
      );

    if (opt == "enable") {
      Schema.findOne({ Guild: message.guild.id }, async (err, data) => {
        if (data)
          return sendError(
            `**Anti Ghost Ping** Module is enabled already`,
            message.channel
          );
        new Schema({
          Guild: message.guild.id,
        }).save();
        sendDone(`**Anti Ghost-Ping** has been enabled.`, message.channel);
      });
    }

    if (opt == "disable") {
      Schema.findOne({ Guild: message.guild.id }, async (err, data) => {
        if (!data)
          return sendError(
            `**Anti Ghost Ping** is disabled already`,
            message.channel
          );
        data.delete();
        sendDone(`**Anti Ghost Ping** has been disabled.`, message.channel);
      });
    }
  },
};
