const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const fetch = require("node-fetch"), moment = require('moment')

module.exports = {
  ...new SlashCommandBuilder()
    .setName("npm")
    .setDescription("Look or search a npmjs package.")
    .addStringOption((option) =>
      option
        .setName("package")
        .setDescription("Package to search on npmjs.com")
        .setRequired(true)
    ),
  /**
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */
  run: async (client, interaction, args) => {
    const package = interaction.options.getString("package");
    const res = await fetch(
      `https://registry.npmjs.com/${encodeURIComponent(package)}`
    ).catch((error) => console.log(error));
    if (res.status === 404)
      return interaction.followUp({ content: "No results found." });
    const body = await res.json();
    const embed = new MessageEmbed()
      .setColor("RED")
      .setTitle(body.name)
      .setURL(`https://www.npmjs.com/package/${body.name}`)
      .setDescription(body.description || "No description.")
      .addField("❯ Version", body["dist-tags"].latest, true)
      .addField("❯ License", body.license || "None", true)
      .addField("❯ Author", body.author ? body.author.name : "None", true)
      .addField(
        "❯ Creation Date",
        moment.utc(body.time.created).format("YYYY/MM/DD hh:mm:ss"),
        true
      )
      .addField(
        "❯ Last Modification Date",
        body.time.modified
          ? moment.utc(body.time.modified).format("YYYY/MM/DD hh:mm:ss")
          : "None",
        true
      )
      .addField(
        "❯ Repository",
        body.repository
          ? `[View Here](${body.repository.url.split("+")[1]})`
          : "None",
        true
      )
      .addField(
        "❯ Maintainers",
        body.maintainers.map((user) => user.name).join(", ")
      );
    interaction.followUp({ embeds: [embed] });
  },
};
