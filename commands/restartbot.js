const { SlashCommandBuilder } = require("@discordjs/builders");
const { token } = require("../config.json");
const { client } = require("../modules/onStart");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("restartbot")
    .setDescription("Restarts bot!"),
  async execute(interaction) {
    await interaction.reply("Restarting!").then(() => {
      client.destroy();
      client.login(token);
    });
  },
};
