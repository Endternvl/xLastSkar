const sendr = require('../../mores/error');
const sendd = require('../../mores/success');

module.exports = {
  name: 'simjoin',
  description: 'send a simulation of join system.',
  botPermission: ['VIEW_CHANNEL','EMBED_LINKS','ATTACH_FILES','MANAGE_CHANNELS','MANAGE_GUILD'],
  authorPermission: ['VIEW_CHANNEL','EMBED_LINKS','ATTACH_FILES','MANAGE_CHANNELS','MANAGE_GUILD'],

  run: async (client, message, args) => {
    client.emit("guildMemberAdd", message.member);
      return sendd('**Simulation-Join Executed!**\nIf you wondering, what is `simjoin` (`simulation join`), it just basically a test that what happened if you join the server.', message.channel)
  }
}