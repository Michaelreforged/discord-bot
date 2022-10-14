const { SlashCommandBuilder } = require("@discordjs/builders");
const {
  createAudioPlayer,
  createAudioResource,
  StreamType,
  AudioPlayerStatus,
  entersState,
} = require("@discordjs/voice");
const { voiceConnect } = require("../modules/voiceConnect");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("addsong")
    .setDescription("Adds Song."),
  async execute(interaction) {
    const player = createAudioPlayer();

    function playSong() {
      const resource = createAudioResource(
        "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        {
          inputType: StreamType.Arbitrary,
        }
      );
      player.play(resource);
      return entersState(player, AudioPlayerStatus.Playing, 5e3);
    }
    await playSong();
    console.log("Song is ready to play!");
    const channel = interaction.member?.voice;
    if (channel) {
      const con = await voiceConnect(channel);
      try {
        // need line below to activate player, need to create player function
        con.subscribe(player);
        interaction.reply("Playing now!");
      } catch (error) {
        interaction.reply("Failed to join");
        console.error(error);
      }
    }
  },
};
