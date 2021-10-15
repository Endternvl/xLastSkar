const sendr = require('../../mores/error');
const sendd = require('../../mores/success');

module.exports = {
  name: 'simleave',
  description: 'send a simulation of leave system.',
  botPermission: ['VIEW_CHANNEL','EMBED_LINKS','ATTACH_FILES','MANAGE_CHANNELS','MANAGE_GUILD'],
  authorPermission: ['VIEW_CHANNEL','EMBED_LINKS','ATTACH_FILES','MANAGE_CHANNELS','MANAGE_GUILD'],

  run: async (client, message, args) => {
    client.emit("guildMemberRemove", message.member);
      return sendd('**Simulation-Leave Executed!**\nIf you wondering, what is `simleave` (`simulation leave`), it just basically a test that what happened if you leave the server.', message.channel)
  }
}