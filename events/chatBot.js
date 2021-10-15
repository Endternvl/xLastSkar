const fetch = require("node-fetch");

client.on("messageCreate", async (message) => {
  if (message.author.bot || !message.guild || message.webhookId) return;
  const cchann = await client.data.get(`chatbot_${message.guild.id}`);
  if (cchann === null) return;
  if (!cchann) return;
  const sender = client.channels.cache.get(cchann);
  if (message.channel.name == sender.name) {
    if (message.author.bot) return;
    message.content = message.content
      .replace(/@(everyone)/gi, "everyone")
      .replace(/@(here)/gi, "here");
    message.channel.sendTyping();
    let data = await fetch(
      `https://api.affiliateplus.xyz/api/chatbot?message=${message.content}&botname=${client.user.username}&ownername=Skaryey&location=Indonesia&scownername=xSkaryet`
    ).then((res) => res.json());

    message.reply({ content: `${data.message}` }).catch();
  }
});
