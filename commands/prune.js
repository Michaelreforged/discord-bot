const { SlashCommandBuilder } = require('@discordjs/builders');
const { clientID } = require('../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('prune')
		.setDescription('Prunes bot messages')
		.addIntegerOption(option =>
			option.setName('input')
				.setDescription('Number of messages to prune, else prune 100'),
		),
	async execute(interaction) {
		// console.log(interaction.channel.messages.purge);
		const botMessages = await interaction.channel.messages.fetch().then(messages => {
			const bmsgs = [];
			messages.filter(m => m.author === clientID).forEach(m => {
				bmsgs.push(m);
			});
		},
		);
		if (interaction.options._hoistedOptions[0]) {
			await interaction.channel.bulkDelete(interaction.options._hoistedOptions[0].value, botMessages);
			await interaction.reply({ content: `Pruning last ${interaction.options._hoistedOptions[0].value}`, ephemeral: true });
		}
		else {
			console.log('prune 100');

			await interaction.channel.bulkDelete(100, botMessages);
			await interaction.reply({ content: 'Pruning last 100 bot messages', ephemeral: true });
		}
	},
};