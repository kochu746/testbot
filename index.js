require('dotenv').config();

const {
  Client,
  GatewayIntentBits,
  ActivityType,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  StringSelectMenuBuilder,
  PermissionsBitField
} = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});


// 🔥 READY
client.once('ready', () => {
  console.log(`🔥 Logged in as ${client.user.tag}`);

  client.user.setActivity('Admin Panel 🛡️', {
    type: ActivityType.Playing
  });
});


// 🛡️ ADMIN PANEL COMMAND
client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  // 🔒 Only admins
  if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) return;

  if (message.content === '!admin') {

    const embed = new EmbedBuilder()
      .setColor(0xff0000)
      .setTitle('🛡️ ADMIN CONTROL PANEL')
      .setDescription('Use buttons below to manage server ⚡')
      .setFooter({ text: 'SYAN ADMIN SYSTEM' });

    // 🔘 Buttons
    const buttons = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId('kick')
        .setLabel('👢 Kick')
        .setStyle(ButtonStyle.Danger),

      new ButtonBuilder()
        .setCustomId('ban')
        .setLabel('🔨 Ban')
        .setStyle(ButtonStyle.Danger),

      new ButtonBuilder()
        .setCustomId('clear')
        .setLabel('🧹 Clear Chat')
        .setStyle(ButtonStyle.Primary)
    );

    // 📜 Dropdown
    const menu = new ActionRowBuilder().addComponents(
      new StringSelectMenuBuilder()
        .setCustomId('admin_menu')
        .setPlaceholder('Select action')
        .addOptions([
          { label: 'Server Info', value: 'server', emoji: '🖥️' },
          { label: 'Member Count', value: 'members', emoji: '👥' }
        ])
    );

    message.reply({
      embeds: [embed],
      components: [buttons, menu]
    });
  }
});


// ⚡ INTERACTIONS
client.on('interactionCreate', async (interaction) => {

  if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
    return interaction.reply({ content: '❌ Admin only!', ephemeral: true });
  }

  // 🔘 BUTTONS
  if (interaction.isButton()) {

    // 👢 KICK
    if (interaction.customId === 'kick') {
      const member = interaction.member;

      return interaction.reply('⚠️ Use command: !kick @user (manual for now)');
    }

    // 🔨 BAN
    if (interaction.customId === 'ban') {
      return interaction.reply('⚠️ Use command: !ban @user (manual for now)');
    }

    // 🧹 CLEAR CHAT
    if (interaction.customId === 'clear') {
      const channel = interaction.channel;

      await channel.bulkDelete(10).catch(() => {});
      return interaction.reply('🧹 Deleted 10 messages!');
    }
  }


  // 📜 DROPDOWN
  if (interaction.isStringSelectMenu()) {

    if (interaction.values[0] === 'server') {
      return interaction.reply(`🖥️ Server: ${interaction.guild.name}`);
    }

    if (interaction.values[0] === 'members') {
      return interaction.reply(`👥 Members: ${interaction.guild.memberCount}`);
    }
  }

});


// 🔐 LOGIN
client.login(process.env.TOKEN);

// 🔥 READY
client.once('ready', () => {
  console.log(`🔥 Logged in as ${client.user.tag}`);

  const statuses = ['SYAN FTW 🔥', 'Use !panel 😎', 'Gaming Mode 🎮'];

  let i = 0;
  setInterval(() => {
    client.user.setActivity(statuses[i % statuses.length], {
      type: ActivityType.Playing
    });
    i++;
  }, 5000);
});


// 💬 COMMAND → PANEL UI
client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  if (message.content === '!panel') {

    // 🎨 Embed
    const embed = new EmbedBuilder()
      .setColor(0xff0000)
      .setTitle('🎛️ SYAN CONTROL PANEL')
      .setDescription('Use buttons or dropdown below 👇')
      .setFooter({ text: 'SYAN FTW 🔥' });

    // 🔘 Buttons
    const buttons = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId('ping')
        .setLabel('🏓 Ping')
        .setStyle(ButtonStyle.Primary),

      new ButtonBuilder()
        .setCustomId('joke')
        .setLabel('😂 Joke')
        .setStyle(ButtonStyle.Success),

      new ButtonBuilder()
        .setCustomId('love')
        .setLabel('❤️ Love')
        .setStyle(ButtonStyle.Danger)
    );

    // 📜 Dropdown
    const select = new ActionRowBuilder().addComponents(
      new StringSelectMenuBuilder()
        .setCustomId('menu')
        .setPlaceholder('Choose a command')
        .addOptions([
          {
            label: 'User Info',
            value: 'me',
            emoji: '👤'
          },
          {
            label: 'Server Info',
            value: 'server',
            emoji: '🖥️'
          },
          {
            label: 'Time',
            value: 'time',
            emoji: '⏰'
          }
        ])
    );

    message.reply({
      embeds: [embed],
      components: [buttons, select]
    });
  }
});


// ⚡ INTERACTIONS (Buttons + Dropdown)
client.on('interactionCreate', async (interaction) => {

  // 🔘 BUTTONS
  if (interaction.isButton()) {

    if (interaction.customId === 'ping') {
      return interaction.reply('🏓 Pong!');
    }

    if (interaction.customId === 'joke') {
      const jokes = [
        'Skill issue 😎',
        'Why lag? Because WiFi crying 😂',
        'Noob detected 🎮'
      ];
      return interaction.reply(jokes[Math.floor(Math.random() * jokes.length)]);
    }

    if (interaction.customId === 'love') {
      return interaction.reply('❤️ SYAN loves you!');
    }
  }


  // 📜 DROPDOWN
  if (interaction.isStringSelectMenu()) {

    const value = interaction.values[0];

    if (value === 'me') {
      return interaction.reply(`👤 Username: ${interaction.user.username}`);
    }

    if (value === 'server') {
      return interaction.reply(`🖥️ Server: ${interaction.guild.name}`);
    }

    if (value === 'time') {
      return interaction.reply(`⏰ ${new Date().toLocaleString()}`);
    }
  }

});


// 🔐 LOGIN
client.login(process.env.TOKEN);
