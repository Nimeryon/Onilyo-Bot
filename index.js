const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json")

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('error', console.error);

client.on('message', msg => {
    const command = msg.content.toLowerCase();
    if (command === 'ping') {
        msg.reply('Pong!');
    }
});

client.login(config.token);