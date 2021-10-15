const { glob } = require("glob"); // glob package for promise
const { promisify } = require("util");
const { Client } = require("discord.js");

const globPromise = promisify(glob);

/**
 * @param {Client} client
 */
module.exports = async (client) => {
  const commandFiles = await globPromise(`${process.cwd()}/commands/**/*.js`);
  commandFiles.map((value) => {
    const file = require(value);
    const splitted = value.split("/");
    const directory = splitted[splitted.length - 2];

    if (file.name) {
      const properties = { directory, ...file };
      client.commands.set(file.name, properties);
    }
  });
  const eventFiles = await globPromise(`${process.cwd()}/events/*.js`);
  eventFiles.map((value) => require(value));

  
  const slashCommands = await globPromise(
    `${process.cwd()}/SlashCommands/*/*.js`
  );

  const arrayOfSlashCommands = []; //array of slash commands
  slashCommands.map((value) => {
    const file = require(value);
    if (!file?.name) return;
    client.slashCommands.set(file.name, file);

    if (["MESSAGE", "USER"].includes(file.type)) delete file.description;
    if (file.userPermissions) file.defaultPermissions = false;
    arrayOfSlashCommands.push(file);
  });
  client.on("ready", async () => {
    await client.application.commands.set(arrayOfSlashCommands);
  });
};
