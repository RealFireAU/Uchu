const { EmbedBuilder, PermissionFlagsBits, ButtonBuilder, ActionRowBuilder } = require('discord.js');
const { BayesClassifier } = require("natural");
const fs = require("fs");

async function loadGuildClassifier(client, guildId) {
    if (client.classifiers.has(guildId)) return;
    const path = `./data/classifiers/${guildId}.json`;
    let classifier = new BayesClassifier();
    if (fs.existsSync(path)) {
        await new Promise((resolve, reject) => {
            BayesClassifier.load(path, null, function (err, classifier) {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    client.classifiers.set(guildId, classifier);
                    console.log(`Loaded classifier for guild ${guildId}`);
                    resolve();
                }
            });
        });
    } else {
        classifier = new BayesClassifier();
        client.classifiers.set(guildId, classifier);
        console.log(`Created classifier for guild ${guildId}`);
        saveGuildClassifier(guildId, classifier);
    }
}

function saveGuildClassifier(guildId, classifier) {
    const path = `data/classifiers/${guildId}.json`;
    classifier.save(path, null, function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log(`Saved classifier for guild ${guildId}`);
        }
    });
}

async function classification(client, m, trainingChannelId) {
    await loadGuildClassifier(client, m.guild.id);
    const classifier = client.classifiers.get(m.guild.id);
    const trainingChannel = await m.guild.channels.cache.get(trainingChannelId);
    if (trainingChannel) {
        let classification;
        try {
            classification = classifier.classify(m.content);
            if (classification === 'toxic') {
                await m.reply(
                    { content: `I think this message was ${classification}.\nPlease advise staff if this is incorrect.`,
                });
                await m.delete();
            }
        } catch (error) {
            console.error(error);
        }
        const embed = new EmbedBuilder()
            .setTitle(`New message in <#${m.channel.id}>`)
            .setDescription(`\`\`\`${m.content}\`\`\``)
            .addFields({
                name: 'Classification', value: classification || 'Not trained yet'
            })
            .setTimestamp();
        const ActionRow = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('toxic')
                    .setLabel('Toxic')
                    .setStyle('Danger'),
                new ButtonBuilder()
                    .setCustomId('nottoxic')
                    .setLabel('Not Toxic')
                    .setStyle('Success'),
            );
        const train = await trainingChannel.send({ embeds: [embed], components: [ActionRow] });
        const filter = i => i.user.id === m.author.id;
        const collector = train.createMessageComponentCollector({ filter, time: 300000 });
        collector.on('collect', async i => {
            if (i.customId === 'toxic') {
                await i.update(
                    { content: "Training data added.", 
                    embeds: [generateEditEmbed(m, 'toxic')], 
                    components: [] 
                });
                await classifier.addDocument(m.content, 'toxic');
                await classifier.train();
                await Classifier.saveGuildClassifier(m.guild.id, classifier);
                await collector.stop();
            } else if (i.customId === 'nottoxic') {
                await i.update(
                    { content: "Training data added.",
                    embeds: [generateEditEmbed(m, 'not toxic')],
                    components: []
                });
                await classifier.addDocument(m.content, 'not toxic');
                await classifier.train();
                await Classifier.saveGuildClassifier(m.guild.id, classifier);
                await collector.stop();
            }
        }
        );
    }
}

function generateEditEmbed(m, classification) {
    const embed = new EmbedBuilder()
        .setTitle(`New message in <#${m.channel.id}>`)
        .setDescription(`\`\`\`${m.content}\`\`\``)
        .addFields({
            name: 'Classification', value: classification || 'Not trained yet'
        });
    return embed;
}

module.exports = classification;