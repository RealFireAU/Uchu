const { SlashCommandBuilder } = require("discord.js");

const setTrainingChannel = new SlashCommandBuilder()
    .setName("settrainingchannel")
    .setDescription("Set the channel to train the classifier in")
    .addChannelOption(option =>
        option.setName("channel")
            .setDescription("The channel to train the classifier in")
            .setRequired(true));
const setTrainingChannelExec = async (interaction) => {
    const channel = interaction.options.getChannel("channel");
    if (!channel.isTextBased()) {
        await interaction.reply("The channel must be a text channel");
        return;
    }
    await interaction.reply({ content: `Set training channel to <#${channel.id}>`, ephemeral: true });
    interaction.client.guildSettings.setItem(interaction.guild.id, { trainingChannel: channel.id });
};

module.exports = {
    name: "settrainingchannel",
    data: setTrainingChannel,
    execute: setTrainingChannelExec,
};