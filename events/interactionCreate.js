const componentArray = [
	{ id: 1, name: 'action row' },
	{ id: 2, name: 'button' },
	{ id: 3, name: 'select menu' },
	{ id: 4, name: 'text input' },
];

const componentNamer = (id) => {
	return componentArray.filter((component) => {
		return component.id == id ;
	})[0].name;

};

module.exports = {
	name: 'interactionCreate',
	execute(interaction) {
		console.log(`${interaction.user.tag} in #${interaction.channel.name} triggered command: ${interaction.commandName || componentNamer(interaction.componentType) + ' ' + interaction.customId}.`);
	},
};