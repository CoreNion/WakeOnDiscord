import { Message, Client, GatewayIntentBits } from 'discord.js';

import { config } from 'dotenv';
config();

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.DirectMessages] });

client.on('messageCreate', (message : Message) => {
  if(message.author.bot) return;

  console.log(message.content)

  if(message.content === "Hello") {
    message.channel.send("Hello");
  }
});

client.on('ready', async () => {
  if(client.user === null) return;
  const startMessage = `Logged in as ${client.user.tag}!`;
  console.log(startMessage);

  // Send a private message to the admin
  const admin = await client.users.fetch(process.env.ADMIN || '');
  admin.send(startMessage);
});

client.login(process.env.TOKEN);