const discord = require("discord.js");
const client = new discord.Client({
  allowedMentions: {
    parse: ["users", "roles", "everyone"],
    repliedUser: false,
  },
  intents: [
    "GUILDS",
    "GUILD_MEMBERS",
    "GUILD_BANS",
    "GUILD_EMOJIS_AND_STICKERS",
    "GUILD_INTEGRATIONS",
    "GUILD_WEBHOOKS",
    "GUILD_INVITES",
    "GUILD_VOICE_STATES",
    "GUILD_PRESENCES",
    "GUILD_MESSAGES",
    "GUILD_MESSAGE_REACTIONS",
    "GUILD_MESSAGE_TYPING",
    "DIRECT_MESSAGES",
    "DIRECT_MESSAGE_REACTIONS",
    "DIRECT_MESSAGE_TYPING",
  ],
}); // ikr it's very changed tho fsr
const db = require("quick.db"); // ik quick.db useless :q
const { token, mongoDBURL } = require("./config.json");
const mongoose = require("mongoose");
const { awaitReply, send, emoji } = require("./Functions");
const { Database } = require("quickmongo");
const { GiveawaysManager } = require("discord-giveaways");

/**Exporting */
module.exports = client;
module.exports.Slash = require("./src/slashImages"); // slash-images

/**Connecting To Mongoose */
mongoose
  .connect(mongoDBURL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(console.log("Connected To Mongo Database!")).catch((error) => console.log(error));

/**Collections */
client.commands = new discord.Collection();
client.slashCommands = new discord.Collection();
client.config = require("./config.json");
client.db = db;
client.data = new Database(mongoDBURL);
client.chatbot = new Database(mongoDBURL);
client.EEmoji = emoji;
client.awaitReply = awaitReply;
client.queue = new discord.Collection();
client.send = send;
client.snipe = new discord.Collection();
client.sr = require('./mores/error');
client.sed = require('./mores/success');
client.sqt = require('./mores/question');
client.giveawaysManager = new GiveawaysManager(client, {
  storage: "./giveaways.json",
  updateCountdownEvery: 5000,
  default: {
    botsCanWin: false,
    embedColor: "BLURPLE",
    reaction: "🎉",
    lastChance: {
      enabled: true,
      content: "⚠️ **10 SECONDS REMAIN TO ENTER !** ⚠️", // if remaining
      threshold: 10000,
      embedColor: "YELLOW",
    },
  },
});

/**Globals */
global.toID = function (text) {
  if (typeof text === "string")
    return text.toLowerCase().replace(/[^a-z0-9]/g, "");
};

global.config = require("./config.json"); //You don't need client.config if you can just do config right? so thats what global does.
global.client = client;

/**Initalizing the project */
require("./handler")(client);

client.login(token).catch(() => {
  return console.log(`Token: '${token}' was invalid`)
});
