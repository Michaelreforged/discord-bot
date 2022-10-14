const { Collection } = require("discord.js");
const fs = require("fs");
const { requireUncached } = require("./requireUncached");
const { commandCategories } = require("../commandCategories");

const getCommands = (client) => {
  client.commands = new Collection();

  commandCategories.forEach((commandCategory) => {
    const commandNames = fs
      .readdirSync(`./${commandCategory}`)
      .filter((file) => file.endsWith(".js"));

    for (const file of commandNames) {
      const command = requireUncached(`../${commandCategory}/${file}`);
      // Set a new item in the Collection
      // With the key as the command name and the value as the exported module
      client.commands.set(command.data.name, command);
    }
  });
};

module.exports = {
  getCommands: getCommands,
};
