const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "setnsfw",
  description: "Set this channel to NSFW",
  usage: "[CHANNEL (optional)]",
  permission: ['MANAGE_CHANNEL'],
  botpermission: ['MANAGE_CHANNEL'],
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message) => {
    let channel = message.channel;
    if (channel.nsfw) {
      channel.edit({ nsfw: !channel.nsfw });
      let embed1 = new MessageEmbed()
        .setTitle("Alright!")
        .setDescription("This channel has been setted to SFW channel (13)")
        .setColor("GREEN")
        .setTimestamp();
      channel.send({ embeds: [embed1] }).catch((error) => undefined);
    } else {
      channel.edit({ nsfw: !channel.nsfw });

      let embed1 = new MessageEmbed()
        .setTitle("Alright!")
        .setDescription("This channel has been setted as NSFW channel (18+).")
        .setColor("f50000")
        .setTimestamp();

      channel.send({ embeds: [embed1] }).catch((error) => undefined)
    }
  },
};
