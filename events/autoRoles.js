module.exports = async client => {
    client.on("guildMemberAdd", async member => {
     if (!member.guild.me.permissions.has("MANAGE_ROLES")) return;
    if (member.user.bot) {
      let wrt = await client.db.get(`roles_bot_${member.guild.id}`);
      if (wrt === null) return;
      let role = await member.guild.roles.cache.get(wrt);
      if (role === null) return;
      await member.roles.add(role);
    } else {
      let wrt = await client.db.get(`roles_${member.guild.id}`);
      if (wrt === null) return;
      let role = await member.guild.roles.cache.get(wrt);
      if (role === null) return;
      await member.roles.add(role);
    }});
  };