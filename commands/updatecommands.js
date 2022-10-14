const { SlashCommandBuilder } = require("@discordjs/builders");
const { getCommands } = require("../modules/getCommands");
const { client } = require("../modules/onStart");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("updatecommands")
    .setDescription("Updates slash commands that are tied to bot"),
  async execute(interaction) {
    await interaction.reply("Updating commands!").then(() => {
      getCommands(client);
    });
  },
};
