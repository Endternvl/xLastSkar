const client = require("../xlast");
const { Message, Client, Collection, MessageEmbed } = require("discord.js");
const cooldown = require("../cooldown.json");
const { default_prefix } = require("../config.json");
const db = require("quick.db"),
  ms = require("ms");
const message = require("../util/message");

/**
 * @param {Client} client
 * @param {Message} message
 * @param {String[]} args
 */

client.on("messageCreate", async (message) => {
  let prefix = db.get(`prefix_${message.guild}`);
  if (prefix === null) prefix = default_prefix;
  let daprefix;

  let mentionRegex = message.content.match(
    new RegExp(`^<@!?(${client.user.id})>`, "gi")
  );

  if (mentionRegex) {
    daprefix = `${mentionRegex[0]}`;
  } else {
    daprefix = prefix;
  }

  client.prefix = prefix;

  if (mentionRegex) {
    return message
      .reply({
        embeds: [
          new MessageEmbed()
            .setTitle("Hello!")
            .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
            .setDescription(
              `I'am ${client.user.username}! i am just a basic discord bot which is still in development. my prefix is this guild is ${client.prefix} and you can instead of using a prefix, you can mention me as a prefix. to get help with my information and updates, or looking on every command, you can do \`${client.prefix}help\` and use the dropdown menu to select the category. and to view a command info, for example, you can do \`${client.prefix}help kick\``
            )
            .setFooter(`© ${client.user.username}`)
            .setColor("BLURPLE"),
        ],
      })
      .catch(() => undefined);
  }

  if (
    message.author.bot ||
    !message.guild ||
    !message.content.toLowerCase().startsWith(daprefix)
  )
    return;

  const [cmd, ...args] = message.content
    .slice(daprefix.length)
    .trim()
    .split(" ");

  const command =
    client.commands.get(cmd.toLowerCase()) ||
    client.commands.find((c) => c.aliases?.includes(cmd.toLowerCase()));

  if (command) {
    if (command.bot) {
      let neededPerms = [];

      command.bot.forEach((p) => {
        if (!message.guild.me.permissions.has(p))
          neededPerms.push("`" + p + "`");
      });

      if (neededPerms.length)
        return message.channel
          .send({
            embeds: [
              new MessageEmbed()
                .setColor("RED")
                .setTimestamp()
                .setDescription(
                  `This command requires me to have this following permissions: **${neededPerms.join(
                    ", "
                  )}**`
                )
                .setFooter(`© ${client.user.username}`),
            ],
          })
          .then((msg) => setTimeout(() => msg.delete), 5000)
          .catch(() => undefined);
    }

    if (command.author) {
      const authorPerms = message.channel.permissionsFor(message.author)
      if (!authorPerms || !authorPerms.has(command.author || "ADMINISTRATOR")) {
        return message.channel
          .send({
            embeds: [
              new MessageEmbed()
                .setColor("RED")
                .setTimestamp()
                .setDescription(
                  `You do not have permission to use this command.\nThis command requires you to have this following permissions: \`${command.author}\``
                )
                .setFooter(`© ${client.user.username}`),
            ],
          })
          .then((msg) => setTimeout(() => msg.delete), 5000)
          .catch(() => undefined);
      }
    }
    if (command.botpermission) {
      let neededPerms = [];

      command.botpermission.forEach((p) => {
        if (!message.guild.me.permissions.has(p)) neededPerms.push("`" + p + "`");
      });

      if (neededPerms.length)
        return message.channel
          .send({
            embeds: [
              new MessageEmbed()
                .setColor("RED")
                .setTimestamp()
                .setDescription(
                  `This command requires me to have this following permissions: **${neededPerms.join(
                    ", "
                  )}**`
                )
                .setFooter(`© ${client.user.username}`),
            ],
          })
          .then((msg) => setTimeout(() => msg.delete), 5000)
          .catch(() => undefined);
    }

    if (command.permissions) {
      const permissions = [];

      command.permission.forEach((p) => {
        if (!message.member.permissions.has(p)) permissions.push("`" + p + "`");
      });

      if (permissions.length)
        return message.channel
          .send({
            embeds: [
              new MessageEmbed()
                .setColor("RED")
                .setTimestamp()
                .setDescription(
                  `You do not have permission to use this command.\nThis command requires you to have this following permissions: \`${
                    permissions.join(", ")
                  }\``
                )
                .setFooter(`© ${client.user.username}`),
            ],
          })
          .then((msg) => setTimeout(() => msg.delete), 5000)
          .catch(() => undefined);
    }
    let uCooldown = cooldown[message.author.id];
    if (!uCooldown) {
      cooldown[message.author.id] = {};
      uCooldown = cooldown[message.author.id];
    }
    let time = uCooldown[command.name] || 0;
    const cooldowntitle = [
      "Slow Down!",
      "Brrr So Cold!",
      "Chill!",
      "Uh Oh!",
      "Hey Wait!",
      "Yikes!",
      "Cooldown",
      "Calm Down!",
      "Oopsie!",
    ];
    const cooldowndesc = [
      "There is no one chases you! You can execute this command again on",
      "Hey, Calm Down! Bruh Now You Have To Wait For",
      "I Dont Like Command Spammer! Are you one of them? now you have to wait",
      "Hey, Stop! Don't Try To Execute My Command Faster Than Cheetah! Isn't Patient 'Hard' For You? Now You Have To Wait",
      "Ehm, You Can Use My Commands On",
      "You can use this command again on",
      "Please be patient... You can use a command after",
    ];
    if (time && time > Date.now())
      return message.channel
        .send({
          embeds: [
            new MessageEmbed()
              .setTitle(
                `${
                  cooldowntitle[
                    Math.floor(Math.random() * cooldowntitle.length)
                  ]
                }`
              )
              .setColor("RED")
              .setTimestamp()
              .setDescription(
                `${
                  cooldowndesc[Math.floor(Math.random() * cooldowndesc.length)]
                } **${Math.ceil((time - Date.now()) / 1000)}s**`
              )
              .setFooter(`© ${client.user.username}`),
          ],
        })
        .then((msg) =>
          setTimeout(() => {
            msg.delete();
          }, Math.ceil(time - Date.now()))
        )
        .catch(() => undefined);
    cooldown[message.author.id][command.name] = Date.now() + command.cooldown;
    try {
      if (command) {
        command.run(client, message, args);
      }
    } catch (error) {
      const errrr = new MessageEmbed()
        .setColor("RED")
        .setTimestamp()
        .setDescription(
          `**Uh Oh!**\nSomething went wrong when executing this command!\nError Message: \`${
            error.message ? error.message : error
          }\``
        )
        .setFooter(`© ${client.user.username}`);
      return message.channel
        .send({ embeds: [errrr] })
        .then(
          setTimeout(() => message.delete),
          5000
        )
        .catch(() => undefined);
    }
  }
});

/**Ready Client */
client.on("ready", async () => {
  client.user.setActivity({
    name: `in ${client.guilds.cache.size} server(s) | xlhelp`,
    type: "PLAYING",
  });
});
