const {
  Client,
  Message,
  MessageEmbed,
  MessageActionRow,
  MessageSelectMenu,
} = require("discord.js");
const { format } = require("util");
const { commands, options } = require("../../xlast");

module.exports = {
  name: "help",
  aliases: [
    "halp",
    "h3lp",
    "commands",
    "c0mm4nd5",
    "c0mmands",
    "c0mm4nds",
    "comm4nds",
    "comm4nd5",
    "command5",
    "allcmds",
  ],
  description: "Get all available commands and get help to a command.",
  cooldown: 5000,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if (!args[0]) {
      const emojis = {
        fun: "<:blurpleepicface:879548787306147890>",
        information: "<:Announcements:877772269668171848>",
        moderation: "<:Blurple_Safe:877771452219285534>",
        about: "<:verifieddev:877772440409899008>",
        lockdown: "<:Blurple_Lockdown:877771743870206002>",
        ticket: "<:Blurple_Ticket:877771557416599572>",
        configuration: "<:Blurple_Gear:877771388151267496> ",
        poster: "<:YouTubeBig:869576982348849182>",
        antialt: "<:Alt:870511493756620800>",
        music: "<:music_notes:832419286281748562>",
        giveaway: "<:tada:880278297785794630>",
        games: "<:blurple_gamestick:885673053856595988>",
        server: "<:blurple_server:887231973846810674>",
      };

      const directories = [
        ...new Set(client.commands.map((cmd) => cmd.directory)),
      ];
      const formatString = (str) =>
        `${str[0].toUpperCase()}${str.slice(1).toLowerCase()}`;
      const categories = directories.map((dir) => {
        const getCommands = client.commands
          .filter((cmd) => cmd.directory === dir)
          .map((cmd) => {
            return {
              name: cmd.name || "Unnamed Command",
              description: cmd.description || "No Description",
            };
          });

        return {
          directory: formatString(dir),
          commands: getCommands,
        };
      });

      const embed = new MessageEmbed()
        .setTitle("Help Menu")
        .setDescription(
          `🛡 Hello! I'am ${client.user.tag}. Welcome to my help menu! here you can look all commands of a category that you selected with the dropdown menu. also you can see change-logs of discord bot on the help menu. Dropdown will be disabled after 50 seconds. so you have to be quick as cheetah.\n**HOW-TO-USE ▬▬▬▬▬▬▬▬▬▬**\nSelect one of the dropdown on below to get all commands on a following category. dropdown menu will be disabled after 10 seconds. so you have to be fast. dont worry, embed will not be resetted so u still can see the commands.\n**CHANGE-LOGS ▬▬▬▬▬▬▬▬▬▬**\nModeration-Logs, Starboard System Is Now ON! Chat-bot system soon`
        )
        .setImage(
          "https://cdn.discordapp.com/attachments/811143476522909718/880285592414470184/thebanner.png"
        )
        .setColor("BLURPLE");

      const components = (state) => [
        new MessageActionRow().addComponents(
          new MessageSelectMenu()
            .setCustomId("help-menu")
            .setPlaceholder("Category Selection")
            .setDisabled(state)
            .addOptions(
              categories.map((cmd) => {
                return {
                  label: cmd.directory,
                  value: cmd.directory.toLowerCase(),
                  descriptioon: `View all commands of ${cmd.directory}.`,
                  emoji: emojis[cmd.directory.toLowerCase()] || null,
                };
              })
            )
        ),
      ];

      const initialMessage = await message.channel.send({
        embeds: [embed],
        components: components(false),
      });

      const filter = (interaction) => interaction.user.id === message.author.id;

      const collector = message.channel.createMessageComponentCollector({
        filter,
        componentType: "SELECT_MENU",
        time: 50000,
      });

      collector.on("collect", (interaction) => {
        const [directory] = interaction.values;
        const category = categories.find(
          (x) => x.directory.toLowerCase() === directory
        );

        const categoryEmbed = new MessageEmbed()
          .setTitle(`${directory} commands`)
          .setDescription(`🛡 Hello! Welcome to ${directory} commands!`)
          .addFields(
            category.commands.map((cmd) => {
              return {
                name: `\`${client.prefix}${cmd.name}\``,
                value: `> ${cmd.description}`,
                inline: true,
              };
            })
          )
          .setColor("BLURPLE");

        interaction.update({ embeds: [categoryEmbed], ephemeral: true });
      });
    } else {
      const command =
        client.commands.get(args[0].toLowerCase()) ||
        client.commands.find(
          (c) => c.aliases && c.aliases.includes(args[0].toLowerCase())
        );
      let agrs;
      if (args[0].length > 10) {
        agrs = `${args[0].slice(0, 10)}...`;
      } else {
        agrs = `${args[0]}`;
      }

      if (!command) {
        return message.channel.send({
          embeds: [
            new MessageEmbed({
              description: `**ERROR**\nThere is no command name with the name: \`${agrs}\``,
              color: "RED",
            }),
          ],
        });
      }

      if (command) {
        const embed = new MessageEmbed()
          .setTitle("Command Details")
          .addField(
            "Name ▬▬▬▬▬▬▬▬▬▬",
            command.name ? `\`${command.name}\`` : "No name for this command."
          )
          .addField(
            "Aliases ▬▬▬▬▬▬▬▬▬▬",
            command.aliases
              ? `\`${command.aliases.join("` `")}\``
              : "No aliases for this command."
          )
          .addField(
            "Usage ▬▬▬▬▬▬▬▬▬▬",
            command.usage
              ? `\`${client.prefix}${command.name} ${command.usage}\``
              : `\`${client.prefix}${command.name}\``
          )
          .addField(
            "Description ▬▬▬▬▬▬▬▬▬▬",
            command.description
              ? command.description
              : "No description for this command."
          )
          .setFooter(
            `Requested by ${message.author.tag}`,
            message.author.displayAvatarURL({
              dynamic: true,
            })
          )
          .setTimestamp()
          .setColor("BLURPLE");
        return message.channel.send({ embeds: [embed] });
      }
    }
  },
};
