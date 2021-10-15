const { afk } = require('../Collection');
const client = require('../xlast');
const moment = require('moment');

client.on("messageCreate", async message => {
  if (!message.guild || message.author.bot) return;

  const mentionedMember = message.mentions.members.first();
  if (mentionedMember) {
    const data = afk.get(mentionedMember.id)

    if(data) {
      const [ timestamp, reason ] = data;
      const timeAgo = moment(timestamp).fromNow();

      client.send({ content: `${mentionedMember} is currently AFK (${timeAgo})\nReason: ${reason}`, message })
    }
  }

  const getData = afk.get(message.author.id);
  if(getData) {
    afk.delete(message.author.id)
    client.send({ content: `Hello and welcome back! your AFK status has been removed from my data`, message })
  }
});