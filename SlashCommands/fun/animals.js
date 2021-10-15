const { Client, CommandInteraction } = require("discord.js");

module.exports = {
  name: 'animals',
  description: "Look for a animal picture on available categories 🐄",
  options: [
    {
      name: 'animal',
      description: "The Animal From The Category 🐈",
      type: "STRING",
      required: true,
      choices: [
        {
          name: "Dog 🐕",
          value: "dog",
        },
        {
          name: "Cat 🐈",
          value: "cat",
        },
        {
          name: "Panda 🐼",
          value: "panda",
        },
        {
          name: "Fox 🦊",
          value: "fox",
        },
        {
          name: "Red Panda 🔴🐼",
          value: "red_panda",
        },
        {
          name: "Koala 🐨",
          value: "koala",
        },
        {
          name: "Bird 🐦",
          value: "bird",
        },
        {
          name: "Kangaroo 🦘",
          value: "kangaroo",
        },
      ],
    },
  ],
  /**
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */
  run: async (client, interaction, args) => {
    const { Slash } = require("../../xlast");
    let animale;
    if (args[0] === 'dog') animale = 'Dog';
    if (args[0] === 'cat') animale = 'Cat';
    if (args[0] === 'panda') animale = 'Panda';
    if (args[0] === 'fox') animale = 'Fox';
    if (args[0] === 'red_panda') animale = 'Red Panda';
    if (args[0] === 'koala') animale = 'Koala';
    if (args[0] === 'bird') animale = 'Bird';
    if (args[0] === 'cat') animale = 'Kangaroo';
    const animal = new Slash({
      type: args,
      interaction: interaction,
      embedFooter: client.user.tag,
      embedTitle: `${animale} Image`,
      embedColor: "RANDOM",
    });
    animal.interactionanimals();
  },
};
