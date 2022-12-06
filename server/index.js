const config = require('./config');
const app = require('express')();
const {Client, GatewayIntentBits} = require('discord.js');
const client = new Client({intents: [GatewayIntentBits.Guilds]});
// const cors = require('cors');
const server = app.listen(config.port, () => {
    console.log(`Listening on port ${config.port}!`);
});
//const users = new Map();

/*
const io = require('socket.io')(server, {
    cors: {
        origin: "*",
    }
});
*/

// app.use(cors());

/*
io.use((socket, next) => {
    const {token} = socket.handshake.auth;

    if (!token) return next(new Error('Authentication error'));

    users.set(socket.id, {
        token
    });

    return next();
});
*/

/*
const alertDisconnectedUser = (socket, user) => {
    socket.emit("message", {
        users: [...users].map(([_, token]) => token.token)
            .filter(function(el, index, arr) {
                return index === arr.indexOf(el);
            }).filter((id, token) => id !== socket.id)
            .filter((token) => token.split('#')[0] !== 'undefined')
    });
    users.delete(socket.id)

    return;
};
*/

/*
io.on("connection", (socket) => {
    socket.emit("message", {
        users: [...users].map(([_, token]) => token.token)
            .filter(function(el, index, arr) {
                return index === arr.indexOf(el);
            })
            .filter((token) => token.split('#')[0] !== 'undefined')
    });

    socket.on("disconnect", alertDisconnectedUser.bind(null, socket, socket.handshake.auth.token));
});
*/

app.get('/', (req, res) => {
    res.send('tooly server-side');
});

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.login(config.token);
