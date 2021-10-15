const client = require("../xlast");
const { MessageEmbed } = require("discord.js");

client.on("interactionCreate", async (interaction) => {
  const embed = new MessageEmbed({
    description:
      "This slash command is no longer exsist. you can use other slashcommands",
    color: "DARK_RED",
  });
  // Slash Command Handling
  if (interaction.isCommand()) {
    await interaction.deferReply({ ephemeral: false }).catch((err) => console.log(err)) // ephemeral = author only.

    const cmd = client.slashCommands.get(interaction.commandName);
    if (!cmd) return interaction.followUp({ embeds: [ embed ] }); // if command is null / not exsist anymore

    const args = []; // arguments, using array

    for (let option of interaction.options.data) {
      if (option.type === "SUB_COMMAND") {
        if (option.name) args.push(option.name);
        option.options?.forEach((x) => {
          if (x.value) args.push(x.value);
        });
      } else if (option.value) args.push(option.value);
    }
    interaction.member = interaction.guild.members.cache.get(
      interaction.user.id
    );

    if (cmd.a_perms) {
      let permissions = []; //array for multiple permissions

      cmd.a_perms.forEach((p) => {
        if (!interaction.member.permissions.has(p)) permissions.push("`" + p + "`");
      });

      if (permissions.length) return interaction.followUp({ 
        ephemeral: true,
        embeds: [
          new MessageEmbed().setColor('BLUE').setDescription(`<@${interaction.member.id}>, you need this following permissions: \`${permissions.join(", ")}\``).setFooter('© xLastSkar')
        ]
       })
    }
    if (cmd.b_perms) {
      let permissions = []; //array for multiple permissions

      cmd.b_perms.forEach((p) => {
        if (!interaction.guild.me.permissions.has(p)) permissions.push("`" + p + "`");
      });

      if (permissions.length) return interaction.followUp({ 
        ephemeral: true,
        embeds: [
          new MessageEmbed().setColor('BLUE').setDescription(`<@${interaction.member.id}>, thank you for using my slash command, but i need this following permissions: \`${permissions.join(", ")}\``).setFooter('© xLastSkar')
        ]
       })
    }
    cmd.run(client, interaction, args);
  }

  // Context Menu Handling
  if (interaction.isContextMenu()) {
    await interaction.deferReply({ ephemeral: false });
    const command = client.slashCommands.get(interaction.commandName);
    if (command) command.run(client, interaction);
  }
});
