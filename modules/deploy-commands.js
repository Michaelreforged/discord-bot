const fs = require("fs");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { clientId, guildId, token } = require("../config.json");
const { requireUncached } = require("./requireUncached");
const { commandCategories } = require("../commandCategories");

const deployCommands = () => {
  const commands = [];

  commandCategories.forEach((commandCategory) => {
    const commandNames = fs
      .readdirSync(`./${commandCategory}`)
      .filter((file) => file.endsWith(".js"));
    console.log(commandCategory);
    for (const file of commandNames) {
      const command = requireUncached(`../${commandCategory}/${file}`);

      commands.push(command.data.toJSON());
    }
  });

  const rest = new REST({ version: "9" }).setToken(token);

  rest
    .put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
    .then(() => console.log("Successfully registered application commands."))
    .catch(console.error);
};

// Comment out lines below to run with node.
module.exports = {
  deployCommands: deployCommands,
};

// Uncomment out line below to run with node.
// deployCommands();
