const { Client, Message, MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const sendError = require("../../mores/error");
const { parse } = require("twemoji-parser");

module.exports = {
  name: "addemoji",
  description: "Steal emoji from a server and add it to your server!",
  aliases: ["stealemoji"],
  cooldown: 5000,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const errembed = new MessageEmbed()
      .setTitle("Error")
      .setDescription(
        `Oh No! An Error Has Just Occurred, Please check if you used the command correctly. Possible Reasons:\n\n• Correct Usage: ${client.prefix}addemoji (emoji name) (link)\n• File cannot be larger than 256.0 kb.\n• Invalid image type`
      )
      .setColor("RED");

    if (
      !message.member.permissions.has(
        "MANAGE_EMOJIS_AND_STICKERS",
        "MANAGE_GUILD"
      )
    ) {
      return sendError(
        "You Don't Have This Following Permissions: `MANAGE_EMOJIS_AND_STICKERS`, `MANAGE_GUILD`",
        message.channel
      );
    }
    if (
      !message.guild.me.permissions.has(
        "MANAGE_EMOJIS_AND_STICKERS",
        "MANAGE_GUILD"
      )
    ) {
      return sendError(
        "I Don't Have This Following Permissions: `MANAGE_EMOJIS_AND_STICKERS`, `MANAGE_GUILD`",
        message.channel
      );
    }
    let isUrl = require("is-url");
    let type = "";
    let name = "";
    let emote = args.join(" ").match(/<?(a)?:?(\w{2,32}):(\d{17,19})>?/gi);
    if (emote) {
      emote = emote[0];
      type = "emoji";
      name = args
        .join(" ")
        .replace(/<?(a)?:?(\w{2,32}):(\d{17,19})>?/gi, "")
        .trim()
        .split(" ")[0];
    } else {
      emote = `${args.find((arg) => isUrl(arg))}`;
      name = args.find((arg) => arg != emote);
      type = "url";
    }
    let emoji = { name: "" };
    let Link;
    if (type == "emoji") {
      emoji = Discord.Util.parseEmoji(emote);
      Link = `https://cdn.discordapp.com/emojis/${emoji.id}.${
        emoji.animated ? "gif" : "png"
      }`;
    } else {
      if (!name)
        return sendError(
          `Usage: \`${client.prefix}addemoji <name> <image or gif url or emoji>\``,
          message.channel
        );
      if (name.length < 2 || name.length > 32)
        return sendError(
          `\`\`\`Invalid Form Body
name: Must be between 2 and 32 in length.\`\`\``,
          message.channel
        );
      Link = message.attachments.first()
        ? message.attachments.first().url
        : emote;
    }

    message.guild.emojis
      .create(`${Link}`, `${`${name || emoji.name}`}`)
      .then((em) =>
        message.channel.send({
          embeds: [
            new MessageEmbed()
              .setTitle("Added Emoji!")
              .setDescription(
                `${em.toString()} has been created with the name: \`${name}\`. Source from: \`${
                  emoji.name || message.attachments.first()?.proxyURL
                }\``
              )
              .setFooter("Added")
              .setTimestamp(message.createdAt)
              .setColor("DARK_GREEN"),
          ],
        })
      )
      .catch(() => {
        message.channel.send({ embeds: [errembed] });
      });
  },
};
