const { MessageEmbed } = require("discord.js");

module.exports = async (text, channel) => {
  const embed = new MessageEmbed({
    title: "Error",
    description: `<:crossmark:879567349282373662> **|** ${text}`,
    color: "DARK_RED",
  });
  channel.send({ embeds: [embed] });
};
