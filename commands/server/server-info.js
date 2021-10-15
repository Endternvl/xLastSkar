const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "server-information",
  description: "View this guild information",
  aliases: ["serverinfo", "guildinfo", "guild-information"],
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message) => {
    const roles = message.guild.roles.cache
      .sort((a, b) => b.position - a.position)
      .map((role) => role.toString())
      .slice(0, -1);
    let displayrole;

    if (roles.length < 20) {
      displayrole = roles.join(" ");
    } else {
      displayrole = roles.slice(20).join(" ");
    }
    const verificationLevels = {
      NONE: "None",
      LOW: "Low",
      MEDUIM: "Medium",
      HIGH: "High",
      VERY_HIGH: "Very High",
    };

    const guildverified = message.guild?.verified;
    let info;
    if (guildverified === true) info = "Yes";
    if (guildverified === false) info = "No";
    const commoninfo = [
      `**Guild Name :** ${message.guild.name}`,
      `**Guild Id :** ${message.guild.id}`,
      `**Guild Created At : ** <t:${Math.floor(
        message.guild.createdAt / 1000
      )}:R>`,
      `**Guild Owner :** <@${message.guild.ownerId}> (${message.guild.ownerId})`,
      `**Guild Verified :** ${info}`,
      `**Guild Verification Level :** ${
        verificationLevels[message.guild.verificationLevel]
      }`,
    ].join("\n");
    const boost = [
      `**Guild Premium Tier :** ${
        message.guild.premiumTier ? `${message.guild.premiumTier}` : `None`
      }`,
      `**Guild Premium Count :** ${
        message.guild.premiumSubscriptionCount || "0"
      }`,
    ].join("\n");
    const stats = [
      `**Roles Count :** ${roles.length}`,
      `**Emojis Count :** ${message.guild.emojis.cache.size}`,
      `**Normal Emojis :** ${
        message.guild.emojis.cache.filter((em) => !em.animated).size
      }`,
      `**Animated Emojis :** ${
        message.guild.emojis.cache.filter((em) => em.animated).size
      }`,
      `**Members Count :** ${message.guild.memberCount}`,
      `**Discord Users :** ${
        message.guild.members.cache.filter((u) => !u.user.bot).size
      }`,
      `**Discord Bots**: ${
        message.guild.members.cache.filter((u) => u.user.bot).size
      }`,
      `**Online Members :** ${
        message.guild.members.cache.filter(
          (u) => u.presence?.status === "online"
        ).size
      }`,
      `**Idle Members :** ${
        message.guild.members.cache.filter((u) => u.presence?.status === "idle")
          .size
      }`,
      `**Busy (Do Not Disturb) Members :** ${
        message.guild.members.cache.filter((u) => u.presence?.status === "dnd")
          .size
      }`,
    ].join("\n");

    const embed = new MessageEmbed()
      .setTitle(`${message.guild.name}`)
      .setThumbnail(message.guild.iconURL({ dynamic: true }))
      .setDescription(
        `This is the information of the ${message.guild.name} guild.`
      )
      .addField("General Informations", commoninfo)
      .addField("Boost Status", boost)
      .addField("Stats Information", stats)
      .addField(`Roles [${roles.length}]`, displayrole);
    message.channel.send({ embeds: [embed] });
  },
};
