const { SlashCommandBuilder } = require('@discordjs/builders');
const { client } = require('../modules/onStart');
const { dying } = require('../responses/dying');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('killbot')
		.setDescription('Kills the bot!'),
	async execute(interaction) {
		await interaction.reply(`${dying()}`).then(() => {
			client.destroy();
			process.exit();
		});
	},
};