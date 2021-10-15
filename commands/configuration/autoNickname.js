const Discord = require("discord.js");
const { Client, Message } = require("discord.js");
const db = require("quick.db");
const sr = require("../../mores/error"),
  sd = require("../../mores/success");
  const ms = require("ms");

module.exports = {
  name: "setautonickname",
  aliases: ["setautonick", "autonicknameset", "autonickname", "autonick"],
  description: "Set a **Auto-Nickname** system",
  usage: "[Options] [Member] [Tag]",
  botpermission: [
    "VIEW_CHANNEL",
    "EMBED_LINKS",
    "ATTACH_FILES",
    "MANAGE_CHANNELS",
    "MANAGE_NICKNAMES",
    "MANAGE_GUILD",
  ],
  permission: ["MANAGE_GUILD"],
  cooldown: 5000,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    let options = ["member", "bot"];
    if (!args.length)
      return sr("Please enter either **member** or **bot**", message.channel);
    const opt = args[0].toLowerCase();
    if (!opt)
      return sendError(
        "Please enter either **member** or **bot**",
        message.channel
      );
    if (!options.includes(opt)) return sr('Please enter either **member** or **bot**', message.channel);

    if (opt == "member") {
        let nick = await client.awaitReply(
            `Please give a role for a joined member.\n> [Member] {tag}\nType \`cancel\` to stop the setup.`,
            { message }
          );
          let atime = 180000;
          if (!nick === ms(atime)) {
      return sr(
        "You didn't provide a nick-name for the last 3 minutes. set-up has been canceled.\n**Try Again?**\nTry again by redoing the command! `",
        client.prefix,
        "setnick member` but now define the nickname ! for example, `setnick member xlastskar is cool`")
      }
    
          if (nick.toLocaleLowerCase() === "cancel")
            return sd("Setup Canceled.", message.channel);
    
          const wel = new Discord.MessageEmbed()
            .setAuthor('Success')
            .setDescription(
              `**Auto-Nickname System** is setted as:\n\`${
                nick.content
              }\`\nView\n\`${nick.content
                .split("{tag}")
                .join(message.author.username)}\``
            )
            .setFooter(`${client.user.username} Auto-Nickname System`)
            .setColor("BLURPLE");
          client.data.set(`nicks_${message.guild.id}`, nick.content);
    
          message.channel.send({ embeds: [ wel ] });
    }
    if (opt == "bot") {
        let nick = await client.awaitReply(
            `Please give a role for a joined bot.\n> [Member] {tag}\nType \`cancel\` to stop the setup`,
            { message }
          );
          let atime = 180000;
          if (!nick === ms(atime)) {
      return sr(
        "You didn't provide a nick-name for the last 3 minutes. set-up has been canceled.\n**Try Again?**\nTry again by redoing the command! `",
        client.prefix,
        "setnick bot` but now define the nickname ! for example, `setnick bot xlastskar is cool`"
      );
    }
    
          if (nick.toLocaleLowerCase() === "cancel")
            return sd("Setup Canceled.", message.channel);
          const wel = new Discord.MessageEmbed()
          .setAuthor('Success')
          .setDescription(
            `**Auto-Nickname System** is setted as:\n\`${
              nick.content
            }\`\nView\n\`${nick.content
              .split("{tag}")
                .join(message.author.username)}`
            )
            .setColor("RED");
          client.data.set(`nicks_bot_${message.guild.id}`, nick.content);
    
          message.channel.send({ embeds: wel });
    }
  },
};
