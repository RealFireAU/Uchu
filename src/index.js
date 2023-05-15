const Discord = require('discord.js');
const config = require('../config.json');
const storage = require('node-persist');

const client = new Discord.Client({intents: [
    Discord.GatewayIntentBits.Guilds,
    Discord.GatewayIntentBits.GuildMessages,
    Discord.GatewayIntentBits.MessageContent,
]});

client.guildSettings = storage.create({dir: './data/guildSettings'});
client.commands = new Discord.Collection();
client.events = new Discord.Collection();
client.classifiers = new Discord.Collection();
client.config = config;

const commands = require('./commands');
commands.forEach(command => {
    client.commands.set(command.name, command);
});

const events = require('./events');
events.forEach(event => {
    client.events.set(event.name, event);
    client.on(event.name, (...args) => event.execute(client, ...args));
});


(async () => {
    await client.guildSettings.init();
    client.login(config.DISCORD_TOKEN);
})();

