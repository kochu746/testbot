require('dotenv').config();

const { Client, GatewayIntentBits, ActivityType } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});


// 🔥 BOT READY
client.once('ready', () => {
  console.log(`🔥 Logged in as ${client.user.tag}`);

  // 🎮 Status
  client.user.setActivity('SYAN FTW 🔥', {
    type: ActivityType.Playing
  });
});


// 💬 COMMANDS
client.on('messageCreate', message => {
  if (message.author.bot) return;

  const msg = message.content.toLowerCase();

  // 🏓 Ping
  if (msg === '!ping') {
    message.reply('🏓 Pong!');
  }

  // 🔥 Branding
  if (msg === '!syan') {
    message.reply('🔥 SYAN FTW 🔥');
  }

  // 😂 Joke
  if (msg === '!joke') {
    const jokes = [
      'Why did the gamer quit? Too many respawns 😂',
      'I tried to catch fog… I mist 😆',
      'Skill issue detected 😎'
    ];
    message.reply(jokes[Math.floor(Math.random() * jokes.length)]);
  }

  // 🎲 Roll
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

  // 💬 Say
  if (msg.startsWith('!say ')) {
    const text = message.content.slice(5);
    message.channel.send(text);
  }

  // ⏰ Time
  if (msg === '!time') {
    message.reply(`⏰ Time: ${new Date().toLocaleString()}`);
  }

  // ❤️ Love
  if (msg === '!love') {
    message.reply('❤️ SYAN loves this server!');
  }

  // 📜 Help
  if (msg === '!help') {
    message.reply(`
📜 **SYAN BOT COMMANDS**
!ping - Check bot
!syan - Branding
!joke - Random joke
!roll - Random number
!me - Your info
!server - Server info
!say <text> - Bot repeats
!time - Current time
!love - Fun message
    `);
  }

});


// 🔐 LOGIN
client.login(process.env.TOKEN);
