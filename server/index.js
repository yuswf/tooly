const {Client, GatewayIntentBits} = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const axios = require('axios');

const config = {
    token: 'MTA0NzYwODkzNTUwMDIxODQ5OQ.Go-IND.je6PHS8GkqP2kq2qTHmItrWh3Yxe3nP9t0Emu4'
}

client.on('ready', () => {
    const items = [];
    client.guilds.cache.get('1041312550777790524').members.cache.map(member => {
        items.push(member.user.id);
    })
    const id = items[Math.floor(Math.random()*items.length)];
    client.guilds.cache.get('1041312550777790524').channels.cache.get('1042410829825454090').send(`hayirdir lan samet :haha:`);
    console.log(`Logged in as ${client.user.tag}!`);
});

client.login(config.token);
