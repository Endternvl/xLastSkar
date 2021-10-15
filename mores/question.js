const { MessageEmbed } = require("discord.js");

module.exports = async (text, channel) => {
  const embed = new MessageEmbed()
    .setTitle("Wait")
    .setDescription(`<:questionmark:884784653188354068> **|** ${text}`)
    .setColor("YELLOW");

  channel.send({ embeds: [embed] });
};
