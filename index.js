const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.once('ready', () => {
  console.log(`🔥 Logged in as ${client.user.tag}`);
});

client.on('messageCreate', message => {
  if (message.author.bot) return;

  if (message.content === '!ping') {
    message.reply('🏓 Pong!');
  }

  if (message.content === '!help') {
  message.reply('Commands: !ping, !syan, !help');
}

if (message.content === '!hello') {
  message.reply('Hey 👋 how are you?');
}

  if (message.content === '!syan') {
    message.reply('🔥 SYAN FTW 🔥');
  }
});

require('dotenv').config();

client.login(process.env.TOKEN);