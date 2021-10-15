const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  ...new SlashCommandBuilder()
    .setName("user")
    .setDescription("Get the user's information.")
    .addUserOption(option =>
      option.setName("member").setDescription("User's name")
    ),
  /**
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */
  run: async (client, interaction, args) => {
    const member = interaction.options.getMember("member") || interaction.member;
    const activities = member.presence.activities;

    const factifity = activities.find((x) => x.assets);
    const devices = member.presence?.clientStatus || {};
    const devicefield = () => {
        const entries = Object.entries(devices).map((value, index) => `${index + 1} ‣ ${value[0][0].toUpperCase()}${value[0].slice(1)}`).join("\n");
        return `${entries}`;
    };
    const embed = new MessageEmbed()
      .setAuthor(member.user.tag || member.user.displayAvatarURL())
      .setColor(
        member.displayHexColor === "#000000"
          ? "BLURPLE"
          : member.displayHexColor
      )
      .setThumbnail(
        factifity
          ? `https://cdn.discordapp.com/app-assets/${factifity.applicationId}/${factifity.assets.largeImage}`
          : member.user.displayAvatarURL()
      )
      .setDescription(
        activities
          .map(
            (x, i) =>
              `**${x.type}:** \`${x.name || "None"} : ${
                x.details || "None"
              } : ${x.state || "None"}\``
          )
          .join("\n")
      )
      .addField("Joined At", member.joinedAt.toLocaleString(), true)
      .addField("Account Created", member.user.createdAt.toLocaleString())
      .addField("Device", devicefield(), true)
      .addField(
        "Common Informations",
        [
          `User Display Name: \`${member.displayName}\``,
          `Server Booster: \`${
            member.premiumSince
              ? `Yes, since ` + member.premiumSince.toLocaleString()
              : "No"
          }\``,
          `Pending User: \`${member.pending ? "Yes" : "No"}\``,
          `Deleted User: \`${member.deleted ? "Yes" : "No"}\``,
          `Bot: \`${member.user?.bot ? "Yes" : "No"}\``,
        ].join("\n")
      );
    interaction.followUp({ embeds: [embed] });
  },
};
