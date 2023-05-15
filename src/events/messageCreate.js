const classification = require('../lib/classifier');

async function handleMessage(client, m) {
    if (m.author.bot) return;
    const settings = await client.guildSettings.getItem(m.guild.id);
    if (settings.hasOwnProperty('trainingChannel')) {
        await classification(client, m, settings.trainingChannel);
    }
}

module.exports = {
    name: "messageCreate",
    execute: handleMessage,
};