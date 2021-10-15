const ms = require("ms");
const Discord = require("discord.js");
const { Client, Message } = require("discord.js");
const messages = require("../../util/message");

module.exports = {
  name: "start",
  description: "start a giveaway!",
  cooldown: 5000,
  usage:
    "[MESSAGE_CHANNEL] [DURATION] [NUMBER_OF_WINNER] [TRUE/FALSE] [GIVEAWAY_PRIZE]",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    let gwrole = await client.data.fetch(`giveawayrole_${message.guild.id}`);
    let givrole;
    givrole = gwrole
    var rolename;
    var BonusEntries;
    if (
      !message.member.permissions.has("MANAGE_GUILD") &&
      !message.member.roles.cache.has(givrole)
    ) {
      return message.channel.send(
        ":x: You need to have the manage messages permissions to start giveaways."
      );
    }
    let giveawayChannel = message.mentions.channels.first();
    // If no channel is mentionned
    if (!giveawayChannel) {
      return message.channel.send(":x: You have to mention a valid channel!");
    }

    if (!message.guild.me.permissionsIn(giveawayChannel).has("SEND_MESSAGES"))
      return message.channel.send({
        content: "I Need A Send Messages Perms On That Channel!",
      });
    if (!giveawayChannel.isText()) {
      return message.channel.send("Please provide a valid text channel!");
    }

    // Giveaway duration
    let giveawayDuration = args[1];
    // If the duration isn't valid
    if (!giveawayDuration || isNaN(ms(giveawayDuration))) {
      return message.channel.send(":x: You have to specify a valid duration!");
    }

    // Number of winners
    let giveawayNumberWinners = parseInt(args[2]);
    // If the specified number of winners is not a number
    if (isNaN(giveawayNumberWinners) || parseInt(giveawayNumberWinners) <= 0) {
      return message.channel.send(
        ":x: You have to specify a valid number of winners!"
      );
    }

    // Giveaway prize
    let giveawayPrize = args.slice(4).join(" ");
    // If no prize is specified
    if (!giveawayPrize) {
      return message.channel.send(":x: You have to specify a valid prize!");
    }

    // allowing mentions
    let allowmention = args[3];
    let trueorfalse;
    const dataget = await client.data.fetch(`giveawayentry_${message.guild}`);
    let yesornah;
    let theroleName = message.guild.roles.cache.get(dataget);
    if (!allowmention)
      return message.channel.send(
        "Please enter either **true** or **false**! try again!"
      );
    if (allowmention.toLowerCase() === "true") {
      trueorfalse = true;
    } else {
      trueorfalse = false;
    }
    if (!dataget) {
      yesornah = `@everyone`;
    } else if (dataget) {
      yesornah = `<@${theroleName.id}>`;
    }

    message.channel.send(
      "Do You Want Any Bonus Enteries? if yes, type `yes`. if no, type `no`"
    );
    const filter = (m) => m.author.id === message.author.id;
    await message.channel
      .awaitMessages({
        filter,
        max: 1,
        time: 300000,
        errors: ["time"],
      })
      .then(async (collected) => {
        if (collected.first().content.toLowerCase() === "yes") {
          await message.channel.send(
            `Alright which role will have bonus enteries?`
          );
          await message.channel
            .awaitMessages({
              filter,
              max: 1,
              time: 60000,
              errors: ["time"],
            })
            .then(async (rolen) => {
              const x =
                message.mentions.roles.first() ||
                client.guilds.cache
                  .get(message.guild.id)
                  .roles.cache.get(args[1]) ||
                message.guild.roles.cache.find(
                  (c) =>
                    c.name.toLowerCase() === args.join(" ").toLocaleLowerCase()
                );
              rolename =
                message.mentions.roles.first() ||
                client.guilds.cache
                  .get(message.guild.id)
                  .roles.cache.get(args[1]) ||
                message.guild.roles.cache.find(
                  (c) =>
                    c.name.toLowerCase() === args.join(" ").toLocaleLowerCase()
                );
              if (!x) {
                message.channel.send(
                  `There are no roles with that name/id, Skipping this.`
                );
                rolename = null;
              }
            });
          if (rolename !== null) {
            await message.channel.send(
              `How many bonus eneteries will we have for ${rolename}?`
            );
            await message.channel
              .awaitMessages({
                filter,
                max: 1,
                time: 60000,
                errors: ["time"],
              })
              .then(async (rolentery) => {
                BonusEntries = parseInt(rolentery.first().content);
                message.channel.send(
                  `**${rolename}** will have **${BonusEntries}** Extra Enteries`
                );
              });
          }
        } else {
          if (collected.first().content.toLowerCase() === "no") {
            message.channel.send("Alright! Skipping this!");
            rolename = null;
            BonusEntries = null;
          } else {
            message.channel.send("Invalid Response Collected, Skipping!");
            rolename = null;
            BonusEntries = null;
          }
        }
      });

    client.giveawaysManager.start(giveawayChannel, {
      duration: ms(giveawayDuration),
      prize: giveawayPrize,
      winnerCount: parseInt(giveawayNumberWinners),
      bonusEntries: [
        {
          // Members who have the role which is assigned to "rolename" get the amount of bonus entries which are assigned to "BonusEntries"
          bonus: new Function(
            "member",
            `return member.roles.cache.some((r) => r.name === \'${rolename}\') ? ${BonusEntries} : null`
          ),
          cumulative: false,
        },
      ],
      hostedBy: client.config.hostedBy ? message.author : null,

      messages: {
        giveaway:
          (trueorfalse ? `${yesornah}\n\n` : "") + "**🎉 GIVEAWAY STARTED 🎉**",
        giveawayEnded:
          (trueorfalse ? `${yesornah}\n\n` : "") + "**🎉 GIVEAWAY ENDED 🎉**",
        inviteToParticipate: "React with 🎉 to participate to the giveaway!",
        dropMessage: "Be the first to react with 🎉  to win the prize!",
        drawing: "Ended {timestamp}",
        winMessage:
          "Congratulations, {winners}! You have won **{this.prize}**! (Hosted by: {this.hostedBy})",
        embedFooter: "🎉 Giveaways",
        noWinner:
          "Giveaway cancelled as no valid participations joined the giveaway.",
        hostedBy: "Giveaway hosted by {this.hostedBy}",
        winners: "Giveaway winner(s)",
        endedAt: "Ended at",
      },
    });
    if (rolename) {
      const mentionfetch = await message.guild.roles.cache.find(
        (n) => n.name === `${rolename}`
      );
      let giveaway = new Discord.MessageEmbed()
        .setAuthor(`Bonus Enteries Alert!`)
        .setDescription(
          `**${mentionfetch}** Has **${BonusEntries}** Extra Enteries in this giveaway!`
        );
      giveawayChannel.send({ embeds: [giveaway] });
    }
    client.sed(
      `${message.author.username.split(
        "...",
        10
      )}, giveaway has been started in <#${giveawayChannel.id}>!`,
      message.channel
    );
  },
};
