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

  // ✅ Set bot status
  client.user.setActivity('SYAN FTW 🔥', {
    type: ActivityType.Playing
  });
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
     // 🔥 Branding
  if (msg === '!syan') {
    message.reply('🔥 SYAN FTW 🔥');
  }

  // 😂 Random joke
  if (msg === '!joke') {
    const jokes = [
      'Why did the gamer quit? Too many respawns 😂',
      'I tried to catch fog… I mist 😆',
      'Why noobs hate lag? Because skill issue 😎'
    ];
    message.reply(jokes[Math.floor(Math.random() * jokes.length)]);
  }

  // 🎲 Random number
  if (msg.startsWith('!roll')) {
    const num = Math.floor(Math.random() * 100) + 1;
    message.reply(`🎲 You rolled: ${num}`);
  }

  // 👤 User info
  if (msg === '!me') {
    message.reply(`👤 Username: ${message.author.username}`);
  }

  // 🖥️ Server info
  if (msg === '!server') {
    message.reply(`🖥️ Server: ${message.guild.name}\n👥 Members: ${message.guild.memberCount}`);
  }

  // 💬 Say command
  if (msg.startsWith('!say ')) {
    const text = message.content.slice(5);
    message.channel.send(text);
  }

  // ⏰ Time
  if (msg === '!time') {
    message.reply(`⏰ Time: ${new Date().toLocaleString()}`);
  }

  // ❤️ Fun reply
  if (msg === '!love') {
    message.reply('❤️ SYAN loves this server!');
  }
  }
require('dotenv').config();

client.login(process.env.TOKEN);
