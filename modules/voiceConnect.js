const { joinVoiceChannel, entersState, VoiceConnectionStatus } = require('@discordjs/voice');

async function voiceConnect(channel) {
	const connection = joinVoiceChannel({
		channelId: channel.channelId,
		guildId: channel.guild.id,
		adapterCreator: channel.guild.voiceAdapterCreator,
	});
	try {
		console.log('connection', connection);
		await entersState(connection, VoiceConnectionStatus.Ready, 30e3);
		console.log(connection);
		return connection;
	}
	catch (error) {
		connection.destroy();
		throw error;
	}
}

module.exports = {
	voiceConnect: voiceConnect,
};