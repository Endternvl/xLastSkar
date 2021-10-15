const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "dm",
  description: "send a user a dm",
  cooldown: 10000,
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */

  run: async (client, message, args) => {
    if (!message.member.permissions.has("ADMINISTRATOR"))
      return message.channel.send("Missing `ADMINISTRATOR` permissions");
    let user =
      message.mentions.users.first() ||
      message.guild.members.cache.get(args[0]);
    let dm = args.slice(1).join(" ");
    if (!dm) return message.channel.send("I can't dm an empty message");
    if (dm.length > 200) {
      return message.reply(
        "You cant send a message more than 200 characters long!"
      );
    }
    if (!user) return message.reply({ content: "Please enter a user to dm!" });
    if (user === client.user) {
      return message.reply({ content: "You cannot dm me i cannot dm myself!" });
    }
    if (user === message.author.bot)
      return message.reply({
        content: "My bot friends blocked me so i cannot dm him :(",
      });
    if (user === message.guild.ownerId) {
      return message.reply({
        content:
          "You cannot **DM** the owner! else if the owner uses this command he can dm himself.",
      });
    } else if (message.guild.owner === message.author.id) {
      try {
        return message.author.send({
          embeds: [
            new MessageEmbed({
              title: `From yourself`,
              description: `${dm}`,
            }),
          ],
        });
      } catch {
        return message.channel.send({
          content:
            "I Cannot Dm Yourself, Your Dms Are Closed For Unknown Users/Bots.",
        });
      }
    }
    

    try {
      const embed = new MessageEmbed()
        .setDescription(`${dm}`)
        .setFooter(`Author: ${message.author.tag}`)
        .setColor("RANDOM");
      await user.send({ embeds: [embed] });
    } catch (error) {
      return message.channel.send(
        "This user cannot be dmed. this user only accept messages from friends or closed."
      );
    }
    message.channel.send("Successfully DM the user");
  },
};
