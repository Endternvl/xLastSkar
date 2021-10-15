const { Message } = require("discord.js");
const client = require("../xlast");
const discord = require("discord.js");

/**
 * @param { Message } message
 */

client.giveawaysManager.on(
  "giveawayReactionAdded",
  async (giveaway, reactor, messageReaction) => {
    if (reactor.user.bot) return;
    try {
      if (giveaway.extraData) {
        await client.guilds.cache
          .get(giveaway.extraData.server)
          .members.fetch(reactor.id);
      }
      reactor.send({
        embeds: [
          new discord.MessageEmbed()
            .setTimestamp()
            .setTitle("<:checkmark:879567805412937801> Entery Approved! 🎉")
            .setDescription(
              `You've entried [This Giveaway](https://discord.com/channels/${giveaway.guildID}/${giveaway.channelID}/${giveaway.messageID}) has been approved! Goodluck winning!`
            )
            .setColor("GREEN")
            .setTimestamp(),
        ],
      });
    } catch (error) {
      const guildx = client.guilds.cache.get(giveaway.extraData);
      messageReaction.users.remove(reactor.user);
      reactor
        .send({
          embeds: [
            new discord.MessageEmbed()
              .setTimestamp()
              .setTitle("<:crossmark:879567349282373662> Entery Denied! 🎉")
              .setDescription(
                `Your entery to [This Giveaway](https://discord.com/channels/${giveaway.guildID}/${giveaway.channelID}/${giveaway.messageID}) has been denied as you did not join **${guildx}**.`
              )
              .setColor("RED"),
          ],
        })
        .catch(() => undefined);
    }
  }
);
client.giveawaysManager.on("endedGiveawayReactionAdded", (member, reaction) => {
  reaction.users.remove(member.user);
  member
    .send({
      embeds: [
        new discord.MessageEmbed()
          .setTitle(`⚠ Uh Oh!`)
          .setDescription(
            "You Can't Enter This Giveaway Because The Giveaway Was Ended!"
          )
          .setColor("RED")
          .setTimestamp(),
      ],
    })
    .catch(() => undefined);
});
client.giveawaysManager.on("giveawayEnded", (giveaway, winners) => {
  winners.forEach((member) => {
    member
      .send({
        embeds: [
          new discord.MessageEmbed()
            .setTitle(`🎁 Let's goo!`)
            .setDescription(
              `Hello there ${member.user}\n Congratulations, You Have Won **[[This Giveaway!]](https://discord.com/channels/${giveaway.guildID}/${giveaway.channelID}/${giveaway.messageID})** Ask the hoster to claim the prize!`
            )
            .setTimestamp()
            .setColor("RED")
            .setFooter(member.user.username, member.user.displayAvatarURL()),
        ],
      })
      .catch(() => undefined);
  });
});
client.giveawaysManager.on("giveawayRerolled", (giveaway, winners) => {
  winners.forEach((member) => {
    member
      .send({
        embeds: [
          new discord.MessageEmbed()
            .setTitle(`🎁 GGs! We Have A New Winner`)
            .setDescription(
              `Hello there ${member.user}\n I heard that the host rerolled and you have won **[[This Giveaway]](https://discord.com/channels/${giveaway.guildID}/${giveaway.channelID}/${giveaway.messageID})**\n Ask the hoster to claim the prize!`
            )
            .setColor("RED")
            .setTimestamp()
            .setFooter(member.user.username, member.user.displayAvatarURL()),
        ],
      })
      .catch(() => undefined);
  });
});
