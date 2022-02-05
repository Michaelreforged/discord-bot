const { Client, Intents } = require('discord.js');
const { summon } = require('../responses/summon');
const { getCommands } = require('./getCommands');

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

const onStart = () => {
	getCommands(client);
};
client.on('ready', () => {
	client.channels.cache.get('931307797876985909').send(`${summon()}`);
});

module.exports = {
	client: client,
	onStart: onStart,
};