const { MessageEmbed, Client, Message } = require("discord.js");
const { Database } = require("quickmongo");
let { mongoDBURL } = require("./config.json");
let database = new Database(mongoDBURL);
const format = require(`humanize-duration`);

module.exports = {
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */

  
   async emoji(msg, client) {
    let emojis = msg.match(/(?<=:)([^:\s]+)(?=:)/g);
    if (!emojis) msg;
    let temp;
    if (emojis) {
      emojis.forEach((m) => {
        let emoji = client.emojis.cache.find((x) => x.name === m);
        if (!emoji) return;
        temp = emoji.toString();
        if (new RegExp(temp, "g").test(msg))
          msg = msg.replace(new RegExp(temp, "g"), emoji.toString());
        else
          msg = msg.replace(new RegExp(":" + m + ":", "g"), emoji.toString());
      });
    }
    return msg;
  },
  async awaitReply(
    content,
    {
      message,
      image,
      embed,
      color = "BLURPLE",
      max = 1,
      time = 180000,
      obj = false,
    }
  ) {
    const filter = (m) => m.author.id === message.author.id;
    let awaitfilreply = await message.channel.send({
      embeds: embed
        ? embed
        : [
            {
              description: content,
              color: color,
              image: {
                url: image ? image : null,
              },
              footer: {
                text: `You only have ${format(time)} to answer`,
              },
            },
          ],
    });
    setTimeout(() => {
      awaitfilreply.delete(); // will deleted awaitReply after timeout, and !embed will returns 'no'
      message.channel.send({ embeds: [ new MessageEmbed().setTitle('⌛ Time Out ⌛').setDescription(`**Sorry!** You haven't answered the setup that i send <t:${Math.floor(time / 1000)}:R>, Set-Up Has Been Canceled.`).setColor('RED').setFooter('Time Out Reached | Error 001') ] })
    }, time);
    try {
      const collected = await message.channel.awaitMessages({
        filter,
        max: max,
        time: time,
        errors: ["time"],
      });
      if (obj) {
        return collected.first();
      }
      return collected.first().content;
    } catch (e) {
      return false;
    }
  },
  async send(content, message, type, color) {
    if (!color) color = "RANDOM";
    if (type === "dm") {
      return message.author.send({
        embeds: [
          new MessageEmbed({
            author: `${message.channel.username}`,
            description: content,
            color: color,
          }),
        ],
      });
    }
    return message.channel.send({
      embeds: [
        new MessageEmbed()
          .setAuthor(
            message.author.displayAvatarURL({ dynamic: true }),
            `${message.author.name}`
          )
          .setDescription(`${content}`)
          .setColor("BLURPLE"),
      ],
    });
  },
};
