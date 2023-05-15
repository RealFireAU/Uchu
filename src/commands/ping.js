const { SlashCommandBuilder } = require("discord.js");

const ping = new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with Pong!");

const pingExec = async (interaction) => {
    await interaction.reply({ content: "Pong!", ephemeral: true });
}

module.exports = {
    name: "ping",
    data: ping,
    execute: pingExec,
};