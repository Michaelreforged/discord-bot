const { Collection } = require('discord.js');
const fs = require('fs');
const { requireUncached } = require('./requireUncached');

const getCommands = (client) => {
	const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

	client.commands = new Collection();

	for (const file of commandFiles) {
		const command = requireUncached(`../commands/${file}`);
		// Set a new item in the Collection
		// With the key as the command name and the value as the exported module
		client.commands.set(command.data.name, command);
	}

};

module.exports = {
	getCommands: getCommands,
};