const { SlashCommandBuilder } = require("@discordjs/builders");
const { voiceConnect } = require("../modules/voiceConnect");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("musicdie")
    .setDescription("Force disconnection from voice channel."),
  async execute(interaction) {
    const channel = interaction.member?.voice;
    if (voiceConnect(channel)) {
      const con = await voiceConnect(channel);
      con.destroy();
      await interaction.reply("Disconnecting.");
    }
  },
};
