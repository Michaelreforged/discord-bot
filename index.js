// const { token } = require('./config.json');
require('dotenv').config();
const { client, onStart } = require('./modules/onStart');
const fs = require('fs');
const { requireUncached } = require('./modules/requireUncached');
const { summon } = require('./responses/summon');

const token = process.env.DISCORD_TOKEN;

// Login to Discord with your client's token
client.login(token);

onStart();

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = requireUncached(`../events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	}
	else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;
	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
		if (command.data.name === 'restartbot') {
			onStart();
		}
	}
	catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
	finally {
		if (command.data.name === 'restartbot') {
			client.channels.cache.get(`${interaction.channel.id}`).send(`${summon()}`);
		}
	}
});