const { DiscordBattleShip } = require('discord-battleship');
const BattleShip = new DiscordBattleShip({
    embedColor: "RANDOM", /* Any Discord.js Color Resolvable will work. */
    prefix: "b!", /* This is the prefix that will be used in the users DM's for commands. 
                    You can set this to any string. */
});
const { Client,Message } = require('discord.js')

module.exports = {
  name: 'battleship',
  usage: '[USER]',
  cooldown: 5000,
  description: 'play basic battleship board game using [discord-battleship](https://npmjs/package/discord-battleship)',
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args
     */
  run: async (client, message, args) => {
    if (message.mentions.users.first().bot === true) return message.reply("Discord Bots Cannot Play Games With You \:(")
    await BattleShip.createGame(message);
  }
}