const fs = require('node:fs/promises');
const path = require('node:path');
require('./commands');

module.exports = async (client) => {
  const commandsPath = path.join(__dirname, '../commands');
  const eventsPath = path.join(__dirname, '../events');

  async function readCommands(dir) {
    const files = await fs.readdir(dir);

    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = await fs.stat(filePath);

      if (stat.isDirectory()) {
        await readCommands(filePath);
      } else if (file.endsWith('.js')) {
        try {
          const command = require(filePath);
          if ('data' in command && 'execute' in command) {
            client.commands.set(command.data.name, command);
          } else {
            console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
          }
        } catch (error) {
          console.error(`Error loading command ${filePath}:`, error);
        }
      }
    }
  }

  async function readEvents(dir) {
    const files = await fs.readdir(dir);
  
    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = await fs.stat(filePath);
  
      if (stat.isDirectory()) {
        await readEvents(filePath);
      } else if (file.endsWith('.js')) {
        try {
          const event = require(filePath);
          if (event.once) {
            client.once(event.name, (...args) => event.execute(...args));
          } else {
            client.on(event.name, (...args) => event.execute(...args));
          }
        } catch (error) {
          console.error(`Error loading event ${filePath}:`, error);
        }
      }
    }
  }

  try {
    await readCommands(commandsPath);
    await readEvents(eventsPath);
  } catch (error) {
    console.error('Error loading commands or events:', error)
  }
};