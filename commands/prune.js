const { SlashCommandBuilder } = require('@discordjs/builders');
const { clientId } = require('../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('prune')
		.setDescription('Prunes bot messages')
		.addIntegerOption(option =>
			option.setName('input')
				.setDescription('Number of bot messages to try prune, else prune 10, cannot exceed 50'),
		),
	async execute(interaction) {
		// console.log(interaction.channel.messages.purge);
		await interaction.channel.messages.fetch({ limit:100 })
			.then(messages => {
				const b = [];
				messages.filter(m => m.author.id === clientId).forEach(msg => {
					b.push(msg);
				});
				return b;
			})
			.then(b => {
				if (interaction.options._hoistedOptions[0]) {
					const check = (interaction.options._hoistedOptions[0].value) > 50 ? true : false;
					const limit = b.splice(0, check ? 50 : interaction.options._hoistedOptions[0].value);
					interaction.channel.bulkDelete(limit);
					check ? interaction.reply({ content: 'Cannot prune past 50, Pruning last 50 bot messages', ephemeral: true }) : interaction.reply({ content: `Pruning last ${interaction.options._hoistedOptions[0].value}`, ephemeral: true });
				}
				else {
					const limit = b.slice(0, 10);
					interaction.channel.bulkDelete(limit);
					interaction.reply({ content: 'Pruning last 10 bot messages', ephemeral: true });
				}
			},
			);
	},
};

