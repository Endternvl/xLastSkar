const { Client, Message, MessageEmbed } = require("discord.js");
const sendError = require("../../mores/error");
const sendDone = require("../../mores/success");

module.exports = {
  name: "setroles",
  description: "Set a role for giveaway manager/muted.",
  botpermission: ["SEND_MESSAGES"],
  permission: ["MANAGE_GUILD", "MANAGE_ROLES"],
  usage: "[OPTION] [INPUT]",
  cooldown: 5000,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    let options = ["giveawayhoster", "mute", "giveawayenter"];

    if (!args.length)
      return sendError(
        "Please enter either **Giveawayhoster** or **Mute** or **Giveawayenter**",
        message.channel
      );
    const opt = args[0].toLowerCase();
    if (!opt)
      return sendError(
        "Please enter either **Giveawayhoster** or **Mute**",
        message.channel
      );

    if (!options.includes(opt))
      return sendError(
        "Please enter either **Giveawayhoster** or **Mute**",
        message.channel
      );

    if (opt.toLocaleLowerCase() == "mute") {
      const bot = client;
      let b = await client.data.fetch(`muterole_${message.guild.id}`);
      if (!args[1]) {
        let roleName = message.guild.roles.cache.get(b);
        if (message.guild.roles.cache.has(b)) {
          return sendDone(
            `**Mute-Role** Set In This Server Is \`${roleName.name}\`!`,
            message.channel
          );
        } else
          return sendError(
            "Please Enter A Role Name or ID To Set!",
            message.channel
          );
      }

      let role =
        message.mentions.roles.first() ||
        bot.guilds.cache.get(message.guild.id).roles.cache.get(args[1]) ||
        message.guild.roles.cache.find(
          (c) => c.name.toLowerCase() === args.join(" ").toLocaleLowerCase()
        );

      if (!role)
        return sendError(
          "Please Enter A Valid Role Name or ID!",
          message.channel
        );

      try {
        let a = await client.data.fetch(`muterole_${message.guild.id}`);

        if (role.id === a) {
          client.data.delete(`muterole_${message.guild.id}`, role.id);
          sendDone(
            `Sucessfully Deleted That Role As The Muted-Role Mention`,
            message.channel
          );
        } else {
          client.data.set(`muterole_${message.guild.id}`, role.id);

          sendDone(
            `\`${role.name}\` Has Been Set Successfully As **Mute-Role!**`,
            message.channel
          );
        }
      } catch (e) {
        return sendError(
          `Missing Permissions or Role Doesn't Exist!`,
          `\n${e.message}`,
          message.channel
        );
      }
    }
    if (opt.toLocaleLowerCase() == "giveawayhoster") {
      const bot = client;
      if (!args[1]) {
        let b = await client.data.fetch(`giveawayrole_${message.guild.id}`);
        let roleName = message.guild.roles.cache.get(b);
        if (message.guild.roles.cache.has(b)) {
          return sendDone(
            `**Giveaway-Role** Set In This Server Is \`${roleName.name}\`!`,
            message.channel
          );
        } else {
          return sendError(
            "Please Enter A Role Name or ID To Set!",
            message.channel
          );
        }
      }

      let role =
        message.mentions.roles.first() ||
        bot.guilds.cache.get(message.guild.id).roles.cache.get(args[1]) ||
        message.guild.roles.cache.find(
          (c) => c.name.toLowerCase() === args.join(" ").toLocaleLowerCase()
        );

      if (!role)
        return sendError(
          "Please Enter A Valid Role Name or ID!",
          message.channel
        );

      try {
        let a = await client.data.fetch(`giveawayrole_${message.guild.id}`);

        if (role.id === a) {
          client.data.delete(`giveawayrole_${message.guild.id}`, role.id);
          sendDone(
            `Sucessfully Deleted That Role As The Giveaway-Hoster`,
            message.channel
          );
        } else {
          client.data.set(`giveawayrole_${message.guild.id}`, role.id);

          sendDone(
            `\`${role.name}\` Has Been Set Successfully As **Giveaway-Hoster-Role!**`,
            message.channel
          );
        }
      } catch (e) {
        return sendError(
          `Missing Permissions or Role Doesn't Exist!`,
          `\n${e.message}`,
          message.channel
        );
      }
    }
  },
};
