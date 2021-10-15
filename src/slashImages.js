const Discord = require("discord.js");
/**
 * @param {Discord.Client} client
 * @param {Discord.CommandInteraction} interaction
 */

class Slash {
  constructor(options) {
    if (!options.embedFooter)
      throw new TypeError(
        "src/slashImages error: Missing an argument: embedFooter"
      );
    if (typeof options.embedFooter !== "string")
      throw new TypeError(
        "src/slashImages error: embedFooter must be a string"
      );

    if (!options.embedTitle)
      throw new TypeError(
        "src/slashImages error: Missing an argument: embedTitle"
      );
    if (typeof options.embedTitle !== "string")
      throw new TypeError("src/slashImages error: embedTitle must be a string");

    if (!options.embedColor)
      throw new TypeError(
        "src/slashImages error: Missing an argument: embedColor"
      );
    if (typeof options.embedColor !== "string")
      throw new TypeError("src/slashImages error: embedColor must be a string");

    this.message = options.message;
    this.embedFooter = options.embedFooter;
    this.embedTitle = options.embedTitle;
    this.embedColor = options.embedColor;
    this.type = options.type || "bird";
    this.interaction = options.interaction;
    this.args = options.args;
  }
  //Random Cuddle
  async anime() {
    const Discord = require("discord.js");
    const axios = require("axios");

    const [type] = this.type;

    const url = `https://api.waifu.pics/sfw/${type}`;

    let response, data;
    try {
      response = await axios.get(url);
      data = response.data;
    } catch (err) {
      return this.interaction.reply({ content: `An Error Has Occured` });
    }

    const embed = new Discord.MessageEmbed()
      .setTitle(this.embedTitle)
      .setColor(this.embedColor)
      .setImage(data.url)
      .setFooter(this.embedFooter);

    this.interaction.reply({ embeds: [embed] });
  }
  async interactionanimals() {
    const Discord = require("discord.js");
    const axios = require("axios");

    const [type] = this.type;

    const image = `https://some-random-api.ml/animal/${type}`;

    let response, data;
    try {
      response = await axios.get(image);
      data = response.data;
    } catch (err) {
      return this.interaction.followUp({ content: `An Error Has Occured` });
    }

    const embed = new Discord.MessageEmbed()
      .setTitle(this.embedTitle)
      .setColor(this.embedColor)
      .setImage(data.image)
      .setFooter(this.embedFooter);

    this.interaction.followUp({ embeds: [embed] });
  }

  async quote() {
    const Discord = require("discord.js");
    const axios = require("axios");

    const ranurl = "https://animechan.vercel.app/api/random";

    if (this.args === "RANDOM") {
      let response, data;
      try {
        response = await axios.get(ranurl);
        data = response.data;
      } catch (e) {
        return this.interaction.followUp(`An error occured!`);
      }

      const ranembed = new Discord.MessageEmbed()
        .setTitle(this.embedTitle)
        .setDescription(data.quote)
        .setColor(this.embedColor)
        .setFooter(`Anime: ${data.anime} | Character: ${data.character}`);

      await this.interaction.followUp({ embeds: [ranembed] });
    } else {
      const [title] = this.args;
      const url = `https://animechan.vercel.app/api/quotes/anime?title=${title}`;
      let response, data;
      try {
        response = await axios.get(url);
        data = response.data;
      } catch (e) {
        return this.interaction.followUp(
          `Sorry that i couldn't find a quote for ${title}`
        );
      }
      const index = Math.floor(Math.random() * data.length);
      const embed = new Discord.MessageEmbed()
        .setTitle(this.embedTitle)
        .setColor(this.embedColor)
        .setDescription(data[index].quote)
        .setFooter(
          `Anime: ${data[index].anime} | Character: ${data[index].character}`
        );

      await this.interaction.followUp({ embeds: [embed] });
    }
  }
}
module.exports = Slash;
