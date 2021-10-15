const Discord = require("discord.js");
const { Client, Message } = require("discord.js");
const sr = require("../../mores/error");

module.exports = {
  name: "removechannel",
  description: "Remove a channel for a starboard channel/welcome logs/etc.",
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
    let keys = ["welcome", "leave", "starboard", "level", "chatbot", "modlogs"];
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
      let data = client.data.fetch(`welchannel_${message.guild}`);
      if (data === null)
        return message.reply({ content: "There are no welcome channel." });
      client.data.delete(`welchannel_${message.guild.id}`);
      message.channel.send({
        embeds: [
          new Discord.MessageEmbed({
            description: `**Success!**\nI've successfully deleted welcome channel!`,
            color: "BLURPLE",
          }),
        ],
      });
    }
    if (key.toLocaleLowerCase() === "leave") {
      let data = client.data.fetch(`levchannel_${message.guild}`);
      if (data === null)
        return message.reply({ content: "There are no leave logs channel." });
      client.data.delete(`levchannel_${message.guild.id}`);
      message.channel.send({
        embeds: [
          new Discord.MessageEmbed({
            description: `**Success!**\nI've successfully deleted leave channel logs!`,
            color: "BLURPLE",
          }),
        ],
      });
    }
    if (key.toLocaleLowerCase() === "starboard") {
      const data = await client.data.fetch(`starboard_${message.guildId}`);
      if (!data)
        return message.channel.send({
          embeds: [
            new Discord.MessageEmbed({
              description:
                "There are no starboard logs message on this guild yet",
              color: "RED",
              footer: "© xLastSkar",
            }),
          ],
        });
        if (data) {
          client.data.delete(`starboard_${message.guildId}`);
      message.channel.send({
        embeds: [
          new Discord.MessageEmbed({
            description: `**Success!**\nI've successfully deleted starboard channel logs`,
            color: "BLURPLE",
          }),
        ],
      });
    }
    }
    if (key.toLocaleLowerCase() === "level") {
      let data = client.data.fetch(`levelchannel_${message.guild}`);
      if (!data)
        return message.reply({ content: "There are no level channel." });
      client.data.delete(`levelchannel_${message.guild.id}`);
      message.channel.send({
        embeds: [
          new Discord.MessageEmbed({
            description: `**Success!**\nI've successfully deleted level channel logs`,
            color: "BLURPLE",
          }),
        ],
      });
    }
    if (key.toLocaleLowerCase() === "chatbot") {
      let data = client.data.fetch(`chatbot_${message.guild}`);
      if (!data)
        return message.reply({ content: "There are no chatbot channel." });
      client.data.delete(`chatbot_${message.guild.id}`);
      message.channel.send({
        embeds: [
          new Discord.MessageEmbed({
            description: `**Success!**\nI've successfully deleted chatbot channel logs`,
            color: "BLURPLE",
          }),
        ],
      });
    }
    if (key.toLocaleLowerCase() === "modlogs") {
      let data = client.data.fetch(`modlogs_${message.guild}`);
      if (!data)
        return message.reply({
          content: "There are no moderation logs channel.",
        });
      client.data.delete(`modlogs_${message.guild.id}`);
      message.channel.send({
        embeds: [
          new Discord.MessageEmbed({
            description: `**Success!**\nI've successfully deleted moderation-logs channel logs`,
            color: "BLURPLE",
          }),
        ],
      });
    }
  },
};
