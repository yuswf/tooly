const config = require('./config');
const app = require('express')();
const {REST, Routes, Client, GatewayIntentBits} = require('discord.js');
const client = new Client({intents: [GatewayIntentBits.Guilds]});
const rest = new REST({ version: '10' }).setToken(config.token);

const {getRecords} = require('./firebase');

app.get('/', (req, res) => {
    res.send('tooly server-side');
});

const commands = [
    {
        name: 'top',
        description: 'Shows the top 10 records.',
    },
];

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'top') {
        const data = await getRecords();

        for (let i = 0; i < data.length; i++) {
            const {id, records} = data[i];
            const user = await client.users.fetch(id).username;
        }

        await interaction.reply('qwe');
    }
});

(async () => {
    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(Routes.applicationCommands(config.id), { body: commands });

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();

client.login(config.token);

app.listen(config.port, () => {
    console.log(`Listening on port ${config.port}!`);
});
