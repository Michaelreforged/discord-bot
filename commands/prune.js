const { SlashCommandBuilder } = require('@discordjs/builders');
const { clientId } = require('../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('prune')
		.setDescription('Prunes messages')
		.addSubcommand(subcommand =>
			subcommand
				.setName('any')
				.setDescription('prune any commands')
				.addIntegerOption(option =>
					option.setName('input')
						.setDescription('Number of any messages to try prune, else prune 10, cannot exceed 50'),
				))
		.addSubcommand(subcommand =>
			subcommand
				.setName('bot')
				.setDescription('prune bot commands')
				.addIntegerOption(option =>
					option.setName('input')
						.setDescription('Number of bot messages to try prune, else prune 10, cannot exceed 50'),
				)),
	async execute(interaction) {
		// console.log(interaction);
		await interaction.channel.messages.fetch({ limit:100 })
			.then(messages => {
				const b = [];
				if (interaction.options._subcommand === 'bot') {
					messages.filter(m => m.author.id === clientId).forEach(msg => {
						b.push(msg);
					});
					return b;
				}
				messages.forEach(msg => b.push(msg));
				return b;
			})
			.then(b => {
				// How to get integer from options without hostiedOptions
				console.log(interaction.options.getInteger('input'));
				if (interaction.options._hoistedOptions[0]) {
					const check = (interaction.options._hoistedOptions[0].value) > 50 ? true : false;
					const limit = b.splice(0, check ? 50 : interaction.options._hoistedOptions[0].value);
					interaction.channel.bulkDelete(limit, true);
					check ? interaction.reply(
						{ content:interaction.options._subcommand === 'bot' ?
							'Cannot prune past 50, Pruning last 50 bot messages' :
							'Cannot prune past 50, Pruning last 50 messages',
						ephemeral: true,
						})
						: interaction.reply(
							{ content: interaction.options._subcommand === 'bot' ?
								`Pruning last ${interaction.options._hoistedOptions[0].value} bot messages` :
								`Pruning last ${interaction.options._hoistedOptions[0].value} messages`,
							ephemeral: true,
							});
				}
				else {
					const limit = b.slice(0, 10);
					interaction.channel.bulkDelete(limit, true);
					interaction.reply(
						{ content: interaction.options._subcommand === 'bot' ?
							'Pruning last 10 bot messages' :
							'Pruning last 10 messages',
						ephemeral: true,
						});
				}
			},
			);
	},
};

