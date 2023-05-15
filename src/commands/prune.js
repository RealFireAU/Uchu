const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

const prune = new SlashCommandBuilder()
    .setName("prune")
    .setDescription("Prunes a number of messages")
    .addIntegerOption(option =>
        option.setName("number")
            .setDescription("The number of messages to prune")
            .setRequired(true)
        );

const pruneExec = async (interaction) => {
    if (!interaction.member.permissions.has(PermissionFlagsBits.ManageMessages)) return;
    const number = interaction.options.getInteger("number");
    if (number < 1 || number > 100) {
        await interaction.reply("The number must be between 1 and 100");
        return;
    }
    const messages = await interaction.channel.messages.fetch({ limit: number });
    const messagesToDelete = messages.filter(message => !message.pinned);

    if (messagesToDelete.some(message => message.createdTimestamp < Date.now() - 1209600000)) {
        messagesToDelete.forEach(message => message.delete());
    } else {
        await interaction.channel.bulkDelete(messagesToDelete);
    }
    await interaction.reply({ content: `Pruned ${number} messages`, ephemeral: true });
}

module.exports = {
    name: "prune",
    data: prune,
    execute: pruneExec,
};