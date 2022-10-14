const { SlashCommandBuilder } = require("@discordjs/builders");
const { deployCommands } = require("../modules/deploy-commands");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("updatecommandslist")
    .setDescription("Updates slash commands list that are tied to bot"),
  async execute(interaction) {
    await interaction.reply("Updating commands list!").then(() => {
      deployCommands();
    });
  },
};
