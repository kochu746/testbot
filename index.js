require('dotenv').config();

const { Client, GatewayIntentBits, ActivityType, EmbedBuilder } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});


// 🔥 READY EVENT
client.once('ready', () => {
  console.log(`🔥 Logged in as ${client.user.tag}`);

  // 🔄 Rotating Status
  const statuses = [
    'SYAN FTW 🔥',
    'Use !help 😎',
    'Gaming Mode 🎮',
    'Powered by SYAN ⚡'
  ];

  let i = 0;

  setInterval(() => {
    client.user.setActivity(statuses[i % statuses.length], {
      type: ActivityType.Playing
    });
    i++;
  }, 5000); // changes every 5 sec
});


// 💬 COMMANDS
client.on('messageCreate', message => {
  if (message.author.bot) return;

  const msg = message.content.toLowerCase();

  // 🏓 Ping
  if (msg === '!ping') {
    const embed = new EmbedBuilder()
      .setColor(0xff0000)
      .setTitle('🏓 Pong!')
      .setDescription('Bot is working perfectly 🚀')
      .setFooter({ text: 'SYAN FTW' });

    message.reply({ embeds: [embed] });
  }

  // 🔥 Branding
  if (msg === '!syan') {
    const embed = new EmbedBuilder()
      .setColor(0xff0000)
      .setTitle('🔥 SYAN FTW 🔥')
      .setDescription('Welcome to the SYAN bot 😎')
      .setFooter({ text: 'Stay Gaming 🎮' });

    message.reply({ embeds: [embed] });
  }

  // 😂 Joke
  if (msg === '!joke') {
    const jokes = [
      'Why did the gamer quit? Too many respawns 😂',
      'I tried to catch fog… I mist 😆',
      'Skill issue detected 😎'
    ];

    const embed = new EmbedBuilder()
      .setColor(0xff0000)
      .setTitle('😂 Random Joke')
      .setDescription(jokes[Math.floor(Math.random() * jokes.length)])
      .setFooter({ text: 'SYAN FUN' });

    message.reply({ embeds: [embed] });
  }

  // 🎲 Roll
  if (msg.startsWith('!roll')) {
    const num = Math.floor(Math.random() * 100) + 1;

    const embed = new EmbedBuilder()
      .setColor(0xff0000)
      .setTitle('🎲 Dice Roll')
      .setDescription(`You rolled: **${num}**`)
      .setFooter({ text: 'Try again!' });

    message.reply({ embeds: [embed] });
  }

  // 👤 User info
  if (msg === '!me') {
    const embed = new EmbedBuilder()
      .setColor(0xff0000)
      .setTitle('👤 User Info')
      .addFields(
        { name: 'Username', value: message.author.username, inline: true },
        { name: 'User ID', value: message.author.id, inline: true }
      )
      .setThumbnail(message.author.displayAvatarURL())
      .setFooter({ text: 'SYAN BOT' });

    message.reply({ embeds: [embed] });
  }

  // 🖥️ Server info
  if (msg === '!server') {
    const embed = new EmbedBuilder()
      .setColor(0xff0000)
      .setTitle('🖥️ Server Info')
      .addFields(
        { name: 'Server Name', value: message.guild.name, inline: true },
        { name: 'Members', value: `${message.guild.memberCount}`, inline: true }
      )
      .setFooter({ text: 'SYAN FTW' });

    message.reply({ embeds: [embed] });
  }

  // 💬 Say
  if (msg.startsWith('!say ')) {
    const text = message.content.slice(5);

    const embed = new EmbedBuilder()
      .setColor(0xff0000)
      .setDescription(text)
      .setFooter({ text: `Requested by ${message.author.username}` });

    message.channel.send({ embeds: [embed] });
  }

  // ⏰ Time
  if (msg === '!time') {
    const embed = new EmbedBuilder()
      .setColor(0xff0000)
      .setTitle('⏰ Current Time')
      .setDescription(new Date().toLocaleString())
      .setFooter({ text: 'SYAN CLOCK' });

    message.reply({ embeds: [embed] });
  }

  // ❤️ Love
  if (msg === '!love') {
    const embed = new EmbedBuilder()
      .setColor(0xff0000)
      .setTitle('❤️ Love')
      .setDescription('SYAN loves this server 💖')
      .setFooter({ text: 'Spread love 😎' });

    message.reply({ embeds: [embed] });
  }

  // 📜 Help
  if (msg === '!help') {
    const embed = new EmbedBuilder()
      .setColor(0xff0000)
      .setTitle('📜 SYAN BOT COMMANDS')
      .setDescription(`
**!ping → Check Bot

!syan → Branding

!joke → Random joke

!roll → Random number 

!me → Your info 

!server → Server info  

!say <text> → Bot repeats 

!time → Current time 

!love → Fun message**  
      `)
      .setFooter({ text: 'SYAN FTW 🔥' });

    message.reply({ embeds: [embed] });
  }

});


// 🔐 LOGIN
client.login(process.env.TOKEN);
