const client = require("../xlast");

client.on("messageDelete", async (message, channel) => {
  let snipes = client.snipe.get(message.guild) || [];

  snipes.unshift({
    msg: message,
    image: message.attachments.first()?.proxyURL || null,
    time: Date.now(),
    channel: message.channel
  });

  client.snipe.set(message.guild, snipes);
});
