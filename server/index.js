const config = require('./config');
const app = require('express')();
const {Client, GatewayIntentBits} = require('discord.js');
const client = new Client({intents: [GatewayIntentBits.Guilds]});

app.get('/', (req, res) => {
    res.send('tooly server-side');
});

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.login(config.token);

app.listen(config.port, () => {
    console.log(`Listening on port ${config.port}!`);
});
