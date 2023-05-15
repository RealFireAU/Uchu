const messageCreate = require('./messageCreate');
const interactionCreate = require('./interactionCreate');
const ready = require('./ready');

module.exports = [
    messageCreate,
    interactionCreate,
    ready,
]