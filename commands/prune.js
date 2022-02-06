const { SlashCommandBuilder } = require('@discordjs/builders');
const { clientId } = require('../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('prune')
		.setDescription('Prunes bot messages')
		.addIntegerOption(option =>
			option.setName('input')
				.setDescription('Number of messages to prune, else prune 10'),
		),
	async execute(interaction) {
		// console.log(interaction.channel.messages.purge);

		const botMessages = async () => {
			const bmsgs = [];
			await interaction.channel.messages.fetch({ limit:100 }).then(messages => {
				messages.filter(m => m.author.id === clientId)
					.forEach(m => {
						bmsgs.push(m);
					});
			},
			);
			return bmsgs;
		};
		if (interaction.options._hoistedOptions[0]) {
			const b = botMessages();
			setTimeout(() => {
				b.then((msg) => {
					const limit = msg.splice(0, interaction.options._hoistedOptions[0].value);
					interaction.channel.bulkDelete(limit);
				});
			}, 1000);
			await interaction.reply({ content: `Pruning last ${interaction.options._hoistedOptions[0].value}`, ephemeral: true });
		}
		else {
			const b = botMessages();
			setTimeout(() => {
				b.then((msg) => {
					const limit = msg.slice(0, 9);
					interaction.channel.bulkDelete(limit);
				});
			}, 1000);
			await interaction.reply({ content: 'Pruning last 10 bot messages', ephemeral: true });
		}
	},
};

