const { SlashCommandBuilder } = require("@discordjs/builders");
const {
  ActionRowBuilder,
  ButtonBuilder,
  ComponentType,
} = require("discord.js");

const timeConvert = (time = "", offset = 0) => {
  const epoch = Math.floor(new Date(time).getTime() / 1000) - offset;
  if (epoch) {
    return `
		 <t:${epoch} :d> is <t:${epoch}:d>
		 <t:${epoch} :f> is <t:${epoch}:f>
		 <t:${epoch} :t> is <t:${epoch}:t>
		 <t:${epoch} :D> is <t:${epoch}:D>
		 <t:${epoch} :F> is <t:${epoch}:F>
		 <t:${epoch} :R> is <t:${epoch}:R>
		 <t:${epoch} :T> is <t:${epoch}:T>
		 `;
  } else {
    return "Not Valid";
  }
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName("time")
    .setDescription("Create Epoch Time format")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("local")
        .setDescription("Uses local time")
        .addStringOption((option) =>
          option
            .setName("local")
            .setDescription("Time to change to EPOCH")
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("now")
        .setDescription("Give Current time in UTC, Ephemeral only user can see")
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("utc")
        .setDescription("Uses local time")
        .addStringOption((option) =>
          option
            .setName("utc")
            .setDescription("Time to change to EPOCH")
            .setRequired(true)
        )
    ),
  async execute(interaction) {
    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("Update")
        .setLabel("Update Time")
        .setStyle("Primary")
    );
    const collector = interaction.channel.createMessageComponentCollector({
      componentType: ComponentType.Button,
    });
    collector.on("collect", (i) => {
      const time = new Date();
      const offset = new Date().getTimezoneOffset() * 60;
      return i.update(
        `Input: ${time}${timeConvert(time)}\nUTC time:${timeConvert(
          time,
          -1 * offset
        )}`
      );
    });
    if (interaction.options.getSubcommand() == "local") {
      const time = interaction.options.getString("local");
      return interaction.reply(`Input: ${time} \n ${timeConvert(time)}`);
    } else if (interaction.options.getSubcommand() == "now") {
      const time = new Date();
      const offset = new Date().getTimezoneOffset() * 60;
      return interaction.reply({
        content: `Input: ${time}${timeConvert(time)}\nUTC time:${timeConvert(
          time,
          -1 * offset
        )}`,
        components: [row],
        ephemeral: true,
      });
    } else {
      const time = interaction.options.getString("utc");
      const offset = new Date().getTimezoneOffset() * 60;
      return interaction.reply(`Input: ${time}\n ${timeConvert(time, offset)}`);
    }
  },
};
