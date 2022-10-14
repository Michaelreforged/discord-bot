// Run this file for commands to show up in discord first time with node deploy-command.js in main folder
const fs = require("fs");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { requireUncached } = require("./modules/requireUncached");
const { commandCategories } = require("./commandCategories");
require("dotenv").config();
const token = process.env.DISCORD_TOKEN;
const guildId = process.env.GUILD_ID;
const clientId = process.env.CLIENT_ID;

const commands = [];

commandCategories.forEach((commandCategory) => {
  const commandnames = fs
    .readdirSync(`./${commandCategory}`)
    .filter((file) => file.endsWith(".js"));
  for (const file of commandnames) {
    const command = requireUncached(`../${commandCategory}/${file}`);

    commands.push(command.data.toJSON());
  }
});
const rest = new REST({ version: "9" }).setToken(token);

rest
  .put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
  .then(() => console.log("Successfully registered application commands."))
  .catch(console.error);
