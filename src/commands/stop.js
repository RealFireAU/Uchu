const { SlashCommandBuilder } = require("discord.js");
const Classifier = require('../lib/classifier');


const stop = new SlashCommandBuilder()
    .setName("stop")
    .setDescription("Stops the bot!");

const stopExec = async (interaction) => {
    if (!interaction.member.id === interaction.client.config.ADMIN_ID) return;
    await interaction.reply({ content: "Stopping...", ephemeral: true });
    await interaction.client.destroy();
}

module.exports = {
    name: "stop",
    data: stop,
    execute: stopExec,
};