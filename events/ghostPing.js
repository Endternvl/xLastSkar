const client = require("../xlast");
const { MessageEmbed } = require("discord.js");
const schema = require("../models/ghostping");

client.on("messageDelete", async (message) => {
  schema.findOne({ Guild: message.guild.id }, async (err, data) => {
    if (!data) return;
    const member = message.mentions.members.first();
    if (member) {
      if (member.id == message.author.id) return;
      if (message.author.bot) return;
      let agrs;
      if (message.content.length > 50) {
        agrs = `${message.content.slice(0, 50)}...`;
      } else {
        agrs = `${message.content}`;
      }
      const ghostembed = new MessageEmbed()
        .setTitle(`Ghost-Ping Alert`)
        .addField(`Message Author`, `${message.author.tag}`, true)
        .addField(`Message Content`, `${agrs}`, true)
        .setColor("YELLOW")
        .setFooter(`${client.user.username}'s Ghost-Ping System`)
        .setThumbnail(message.author.displayAvatarURL({ dynamic: true }));
      message.channel.send({ embeds: [ghostembed] });
    }
  });
});
