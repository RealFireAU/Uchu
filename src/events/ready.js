async function handleReady(client) {
    console.log(`Logged in as ${client.user.tag}!`);

    const commandsToRegister = client.commands.map(command => command.data.toJSON());
    await client.application.commands.set(commandsToRegister);

    await client.guilds.fetch();

    client.guilds.cache.forEach(async guild => {
        const settings = await client.guildSettings.getItem(guild.id);
        if (!settings) {
            await client.guildSettings.setItem(guild.id, {});
        }
    });
}

module.exports = {
    name: "ready",
    execute: handleReady,
};