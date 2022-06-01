const { SlashCommandBuilder } = require('@discordjs/builders');

const timeConvert = (time = '', offset = 0) => {

	const epoch = new Date(time).getTime() / 1000 - offset;
	if (epoch) {
		return `Input: ${time}
		 <t:${epoch} :d> is <t:${epoch}:d>
		 <t:${epoch} :f> is <t:${epoch}:f>
		 <t:${epoch} :t> is <t:${epoch}:t>
		 <t:${epoch} :D> is <t:${epoch}:D>
		 <t:${epoch} :F> is <t:${epoch}:F>
		 <t:${epoch} :R> is <t:${epoch}:R>
		 <t:${epoch} :T> is <t:${epoch}:T>
		 `;
	}
	else {
		return 'Not Valid';
	}
};

module.exports = {
	data: new SlashCommandBuilder()
		.setName('time')
		.setDescription('Create Epoch Time format')
		.addSubcommand(subcommand =>
			subcommand
				.setName('local')
				.setDescription('Uses local time')
				.addStringOption(option =>
					option.setName('local')
						.setDescription('Time to change to EPOCH')
						.setRequired(true),
				))
		.addSubcommand(subcommand =>
			subcommand
				.setName('utc')
				.setDescription('Uses local time')
				.addStringOption(option =>
					option.setName('utc')
						.setDescription('Time to change to EPOCH')
						.setRequired(true),
				)),
	async execute(interaction) {
		if (interaction.options.getSubcommand() == 'local') {
			const time = interaction.options.getString('local');
			return interaction.reply(`${timeConvert(time)}`);
		}
		else {
			const time = interaction.options.getString('utc');
			const offset = new Date().getTimezoneOffset() * 60;
			return interaction.reply(`${timeConvert(time, offset)}`);
		}
	},
};
