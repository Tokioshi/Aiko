const { token } = require('dotenv').config().parsed;
const { Client, GatewayIntentBits, ActivityType, Collection } = require('discord.js');

class Bot extends Client {
  constructor() {
    super({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
      ],
      presence: {
        activities: [{
          type: ActivityType.Custom,
          name: 'customstatus',
          state: '🔒 Beta Development!'
        }],
        status: 'dnd',
      },
    });

    this.commands = new Collection();
    this.config = require('./src/config/config.js');
    
    require('./src/handler/index.js')(this);
  };
};

const client = new Bot();
client.login(token);