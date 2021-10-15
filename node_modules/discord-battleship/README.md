# What is discord-battleship?
Discord-BattleShip is meant to create and handle an advanced version of the classic board game, Battle Ship, in your very own Discord.js Bots! An example bot using this package can be found [here](https://github.com/Maxisthemoose/example-discord-battleship-bot).
## Table of Contents
1. [What is discord-battleship](https://github.com/Maxisthemoose/discord-battleship#what-is-discord-battleship)
2. [Table of Contents](https://github.com/Maxisthemoose/discord-battleship#table-of-contents)
3. [Installation](https://github.com/Maxisthemoose/discord-battleship#installation)
4. [Getting Started](https://github.com/Maxisthemoose/discord-battleship#getting-started)
5. [Documentation](https://github.com/Maxisthemoose/discord-battleship#documentation)
## Installation
```cmd
npm install discord-battleship
```
## Getting Started
Make sure you have installed the latest stable version of [Node.js](https://nodejs.org/en/)
### Using CommonJS
```js
const { Client } = require("discord.js");
const client = new Client();
const { DiscordBattleShip } = require("discord-battleship");

const BattleShip = new DiscordBattleShip({
    embedColor: "RED", /* Any Discord.js Color Resolvable will work. */
    prefix: "?", /* This is the prefix that will be used in the users DM's for commands. 
                    You can set this to any string. */
});

client.on("ready", () => console.log("Ready!"));

client.on("message", async (message) => {
    if (message.content.toLowerCase().includes("?battleship"))
        await BattleShip.createGame(message);
});

client.login("TOKEN");
```
### Using Modules
```js
import { Client } from "discord.js";
const client = new Client();
import { DiscordBattleShip } from "discord-battleship";

const BattleShip = new DiscordBattleShip({
    embedColor: "RED", /* Any Discord.js Color Resolvable will work. */
    prefix: "?", /* This is the prefix that will be used in the users DM's for commands. 
                    You can set this to any string. */
});

client.on("ready", () => console.log("Ready!"));

client.on("message", async (message) => {
    if (message.content.toLowerCase().includes("?battleship"))
        await BattleShip.createGame(message);
});

client.login("TOKEN");
```
# Documentation
## Class Options
### options.embedColor: ColorResolvable
```js
new DiscordBattleShip({ embedColor: "YELLOW" }) // Any hex value will work aswell.
```
Any valid Discord.js ColorResolvable is a valid option for this parameter. This option is the color for any embed sent by DiscordBattleShip.
___
### options.prefix: string
```js
new DiscordBattleShip({ prefix: "?" });
```
Any valid string is a valid option for this parameter. This option will be the prefix that the package will use in the DM's of users for adding boats, attacking, etc. This could be your custom server prefix, or some hard coded value.
## Methods
### createGame(message: Message): Promise\<Message\>
```js
client.on("message", async (message) => {
    if (message.content.toLowerCase().includes("!battleship"))
        await BattleShip.createGame(message);
});
```
To create, handle and finish a new battleship game, call the createGame() method. This method only accepts one parameter, which is the message object. This is also the only method in the package. This method will handle the creation of the game, DMing users, updating each board, attacking the opponent, win states and more. This is all you need to know to create a new game of battle ship!
___
##### If you encounter bugs or would like to make suggestions you can do so [here](https://github.com/Maxisthemoose/discord-battleship/issues), or contact me dirrectly on Discord at `That Duck Max#8153`.