const Discord = require("discord.js");
const { Client, Message } = require("discord.js");
const sr = require("../../mores/error");
const { sed } = require("../../xlast");

module.exports = {
  name: "setchannel",
  description: "Set a channel for a starboard channel/welcome logs/etc.",
  usage: "[KEY] [OPTIONS]",
  cooldown: 5000,
  botpermission: [
    "VIEW_CHANNEL",
    "EMBED_LINKS",
    "ATTACH_FILES",
    "SEND_MESSAGES",
    "MANAGE_CHANNELS",
    "MANAGE_GUILD",
    "MANAGE_WEBHOOKS",
  ],
  permission: [
    "VIEW_CHANNEL",
    "EMBED_LINKS",
    "ATTACH_FILES",
    "MANAGE_CHANNELS",
    "MANAGE_GUILD",
  ],
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    let keys = [
      "welcome",
      "leave",
      "starboard",
      "level",
      "chatbot",
      "modlogs",
      "msglogs",
    ];
    const key = await client.awaitReply(
      `Please choose one of this key!\nKeys: ${keys.join(
        "\n"
      )}\nTo cancel the set-up, type \`cancel\``,
      { message }
    );
    if (!key) {
      return sr(
        "You didn't provide a key last in 3 minutes. setup canceled.",
        message.channel
      );
    }
    if (key.toLocaleLowerCase() === "cancel") {
      return client.sed("Setup Canceled Successfully!", message.channel);
    }
    if (!keys.includes(key.toLocaleLowerCase())) {
      sr(
        `There are no such a key with that name!\n**Available Keys:** ${keys.join(
          "\n"
        )}. Setup Canceled.`,
        message.channel
      ).catch(() => undefined);
    }

    // welcome setup
    if (key.toLocaleLowerCase() === "welcome") {
      let welcome = await client.awaitReply(
        "Okay! **Welcome-Setup** Has Been Choosed!\nNow, Please Enter A Message Channel For Me To Send Welcome Logs!\nType `cancel` to cancel the setup.",
        { message, obj: true }
      );
      if (!welcome) {
        return sr(
          "You didn't provide a message-channel for the last 3 minutes. set-up has been canceled.\n**Try Again?**\nTry again by redoing the command! `",
          client.prefix,
          "setchannel` but now define the channel! for example, `#chatbot`"
        );
      }
      if (welcome.content.toLocaleLowerCase() === "cancel")
        return client.sed("Setup canceled successfully!", message.channel);
      const channel =
        welcome.mentions.channels.first() ||
        client.guilds.cache.get(message.guild.id).channels.cache.get(args[0]) ||
        welcome.guild.channels.cache.find(
          (c) => c.name.toLowerCase() === welcome.content.toLocaleLowerCase()
        );
      if (!channel || !channel.isText())
        return sr(
          "You didn't provide a valid channel! channel must be a message channel or a message channel id that was inside this server!",
          message.channel
        );
      if (!message.guild.me.permissionsIn(channel).has("SEND_MESSAGES"))
        return sr(
          "I Don't Have Permissions To Send Messages On That Channel! Please Add Me A Send Messages Permissions To Me!",
          message.channel
        );
      client.data.set(`welchannel_${message.guild.id}`, channel.id);
      message.channel.send({
        embeds: [
          new Discord.MessageEmbed({
            description: `**Success!**\nI've successfully setted welcome channel to <#${channel.id}>`,
            color: "BLURPLE",
          }),
        ],
      });
    }
    if (key.toLocaleLowerCase() === "leave") {
      let welcome = await client.awaitReply(
        "Okay! **Leave-Setup** Has Been Choosed!\nNow, Please Enter A Message Channel For Me To Send Leave Logs!\nType `cancel` to cancel the setup.",
        { message, obj: true }
      );
      if (!welcome) {
        return sr(
          "You didn't provide a message-channel for the last 3 minutes. set-up has been canceled.\n**Try Again?**\nTry again by redoing the command! `",
          client.prefix,
          "setchannel` but now define the channel! for example, `#chatbot`"
        );
      }
      if (welcome.content.toLocaleLowerCase() === "cancel")
        return client.sed("Setup canceled successfully!", message.channel);
      const channel =
        welcome.mentions.channels.first() ||
        client.guilds.cache.get(message.guild.id).channels.cache.get(args[0]) ||
        welcome.guild.channels.cache.find(
          (c) => c.name.toLowerCase() === welcome.content.toLocaleLowerCase()
        );
      if (!channel || !channel.isText())
        return sr(
          "You didn't provide a valid channel! channel must be a message channel or a message channel id that was inside this server!",
          message.channel
        );
      if (!message.guild.me.permissionsIn(channel).has("SEND_MESSAGES"))
        return sr(
          "I Don't Have Permissions To Send Messages On That Channel! Please Add Me A Send Messages Permissions To Me!",
          message.channel
        );
      client.data.set(`levchannel_${message.guild.id}`, channel.id);
      message.channel.send({
        embeds: [
          new Discord.MessageEmbed({
            description: `**Success!**\nI've successfully setted leave channel logs to <#${channel.id}>`,
            color: "BLURPLE",
          }),
        ],
      });
    }
    if (key.toLocaleLowerCase() === "starboard") {
      const welcome = await client.awaitReply(
        "Alright! Now, please enter a text channel for the starboard channel.\nType `cancel` to cancel the setup.",
        { message, obj: true }
      );
      if (welcome.content.toLocaleLowerCase() === "cancel")
        return client.sed("Setup canceled successfully!", message.channel);
      if (!welcome)
        return sr(
          "You havent provide a text channel for the last 3 minutes, setup canceled.",
          message.channel
        );
      const channel =
        welcome.mentions.channels.first() ||
        client.guilds.cache.get(message.guild.id).channels.cache.get(args[0]) ||
        welcome.guild.channels.cache.find(
          (c) => c.name.toLowerCase() === welcome.content.toLocaleLowerCase()
        );
      if (!channel || !channel.isText())
        return sr(
          "You didn't provide a valid channel! channel must be a message channel or a message channel id that was inside this server!",
          message.channel
        );
      if (!message.guild.me.permissionsIn(channel).has("SEND_MESSAGES"))
        return sr(
          "I Don't Have Permissions To Send Messages On That Channel! Please Add Me A Send Messages Permissions To Me!",
          message.channel
        );
      client.data.set(`starboard_${message.guild.id}`, channel.id);
      message.channel.send({
        embeds: [
          new Discord.MessageEmbed({
            description: `**Success!**\nI've successfully setted starboard channel logs to <#${channel.id}>`,
            color: "BLURPLE",
          }),
        ],
      });
    }
    if (key.toLocaleLowerCase() === "level") {
      let welcome = await client.awaitReply(
        "Okay! **Level-Logs-Setup** Has Been Choosed!\nNow, Please Enter A Message Channel For Me To Send Level Up Logs!\nType `cancel` to cancel the setup.",
        { message, obj: true }
      );
      if (!welcome) {
        return sr(
          "You didn't provide a message-channel for the last 3 minutes. set-up has been canceled.\n**Try Again?**\nTry again by redoing the command! `",
          client.prefix,
          "setchannel` but now define the channel! for example, `#level-logs`"
        );
      }
      if (welcome.content.toLocaleLowerCase() === "cancel")
        return client.sed("Setup canceled successfully!", message.channel);
      const channel =
        welcome.mentions.channels.first() ||
        client.guilds.cache.get(message.guild.id).channels.cache.get(args[0]) ||
        welcome.guild.channels.cache.find(
          (c) => c.name.toLowerCase() === welcome.content.toLocaleLowerCase()
        );
      if (!channel || !channel.isText())
        return sr(
          "You didn't provide a valid channel! channel must be a message channel or a message channel id that was inside this server!",
          message.channel
        );
      if (!message.guild.me.permissionsIn(channel).has("SEND_MESSAGES"))
        return sr(
          "I Don't Have Permissions To Send Messages On That Channel! Please Add Me A Send Messages Permissions To Me!",
          message.channel
        );
      client.data.set(`levelchannel_${message.guild.id}`, channel.id);
      message.channel.send({
        embeds: [
          new Discord.MessageEmbed({
            description: `**Success!**\nI've successfully setted level channel logs to <#${channel.id}>`,
            color: "BLURPLE",
          }),
        ],
      });
    }
    if (key.toLocaleLowerCase() === "chatbot") {
      let welcome = await client.awaitReply(
        "Okay! **Chat-Bot-Setup** Has Been Choosed!\nNow, Please Enter A Message Channel For Me To Send Chat Bot Logs!\nType `cancel` to cancel the setup.",
        { message, obj: true }
      );
      if (!welcome) {
        return sr(
          "You didn't provide a message-channel for the last 3 minutes. set-up has been canceled.\n**Try Again?**\nTry again by redoing the command! `",
          client.prefix,
          "setchannel` but now define the channel! for example, `#chatbot`"
        );
      }
      if (welcome.content.toLocaleLowerCase() === "cancel")
        return client.sed("Setup canceled successfully!", message.channel);
      const channel =
        welcome.mentions.channels.first() ||
        client.guilds.cache.get(message.guild.id).channels.cache.get(args[0]) ||
        welcome.guild.channels.cache.find(
          (c) => c.name.toLowerCase() === welcome.content.toLocaleLowerCase()
        );
      if (!channel || !channel.isText())
        return sr(
          "You didn't provide a valid channel! channel must be a message channel or a message channel id that was inside this server!",
          message.channel
        );
      if (!message.guild.me.permissionsIn(channel).has("SEND_MESSAGES"))
        return sr(
          "I Don't Have Permissions To Send Messages On That Channel! Please Add Me A Send Messages Permissions To Me!",
          message.channel
        );
      client.data.set(`chatbot_${message.guild.id}`, channel.id);
      message.channel.send({
        embeds: [
          new Discord.MessageEmbed({
            description: `**Success!**\nI've successfully setted chatbot channel logs to <#${channel.id}>`,
            color: "BLURPLE",
          }),
        ],
      });
    }
    if (key.toLocaleLowerCase() === "modlogs") {
      let welcome = await client.awaitReply(
        "Okay! **Modlogs-Setup** Has Been Choosed!\nNow, Please Enter A Message Channel For Me To Send Moderation Logs!\nType `cancel` to cancel the setup.",
        { message, obj: true }
      );
      if (!welcome) {
        return sr(
          "You didn't provide a message-channel for the last 3 minutes. set-up has been canceled.\n**Try Again?**\nTry again by redoing the command! `",
          client.prefix,
          "setchannel` but now define the channel! for example, `#modlogs`"
        );
      }
      if (welcome.content.toLocaleLowerCase() === "cancel")
        return client.sed("Setup canceled successfully!", message.channel);
      const channel =
        welcome.mentions.channels.first() ||
        client.guilds.cache.get(message.guild.id).channels.cache.get(args[0]) ||
        welcome.guild.channels.cache.find(
          (c) => c.name.toLowerCase() === welcome.content.toLocaleLowerCase()
        );
      if (!channel || !channel.isText())
        return sr(
          "You didn't provide a valid channel! channel must be a message channel or a message channel id that was inside this server!",
          message.channel
        );
      if (!message.guild.me.permissionsIn(channel).has("SEND_MESSAGES"))
        return sr(
          "I Don't Have Permissions To Send Messages On That Channel! Please Add Me A Send Messages Permissions To Me!",
          message.channel
        );
      client.data.set(`modlogs_${message.guild.id}`, channel.id);
      message.channel.send({
        embeds: [
          new Discord.MessageEmbed({
            description: `**Success!**\nI've successfully setted moderation-logs channel logs to <#${channel.id}>`,
            color: "BLURPLE",
          }),
        ],
      });
    }
    if (key.toLocaleLowerCase() === "msglogs") {
      let welcome = await client.awaitReply(
        "Alright! **Message-Logs Setup** Has Been Choosed!\nNow, Please Enter A Message Channel For Me To Send Chat Bot Logs!\nType `cancel` to cancel the setup.",
        { message, obj: true }
      );
      if (!welcome) {
        return sr(
          "You didn't provide a message-channel for the last 3 minutes. set-up has been canceled.\n**Try Again?**\nTry again by redoing the command! `",
          client.prefix,
          "setchannel` but now define the channel! for example, `#messagelogs`"
        );
      }
      if (welcome.content.toLocaleLowerCase() === "cancel")
        return client.sed("Setup canceled successfully!", message.channel);
      const channel =
        welcome.mentions.channels.first() ||
        client.guilds.cache.get(message.guild.id).channels.cache.get(args[0]) ||
        welcome.guild.channels.cache.find(
          (c) => c.name.toLowerCase() === welcome.content.toLocaleLowerCase()
        );
      if (!channel || !channel.isText())
        return sr(
          "You didn't provide a valid channel! channel must be a message channel or a message channel id that was inside this server!",
          message.channel
        );
      if (!message.guild.me.permissionsIn(channel).has("SEND_MESSAGES"))
        return sr(
          "I Don't Have Permissions To Send Messages On That Channel! Please Add Me A Send Messages Permissions To Me!",
          message.channel
        );
      client.data.set(`msglogs_${message.guild.id}`, channel.id);
      message.channel.send({
        embeds: [
          new Discord.MessageEmbed({
            description: `**Success!**\nI've successfully setted message-logs channel logs to <#${channel.id}>`,
            color: "BLURPLE",
          }),
        ],
      });
    }
  },
};
