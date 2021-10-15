const { MessageEmbed } = require('discord.js');

module.exports = async (text, channel) => {
    const embed = new MessageEmbed({
        title: 'Success',
        description: `<:checkmark:879567805412937801> **|** ${text}`,
        color: 'DARK_GREEN'
});
channel.send({ embeds: [ embed ] })
}