const { SlashCommandBuilder } = require('@discordjs/builders');
const { client } = require('../modules/onStart');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('musicping')
		.setDescription('Replies with ping to the discord.'),
	async execute(interaction) {
		await interaction.reply(`Current ping: ${client.ws.ping} ms.`);
	},
};