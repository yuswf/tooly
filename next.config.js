/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['cdn.discordapp.com'],
    },
    env: {
        authorization: 'https://discord.com/api/oauth2/authorize',
        clientId: '1047608935500218499',
        clientSecret: 'v4t42xuN2tITFmWNYA1awKldUDEukOSm',
        redirectUri: 'https://toooly.vercel.app/api/callback',
        token: 'MTA0NzYwODkzNTUwMDIxODQ5OQ.Go-IND.je6PHS8GkqP2kq2qTHmItrWh3Yxe3nP9t0Emu4',
        apiEndPoint: 'https://discord.com/api/v10',
        avatarBase: 'https://cdn.discordapp.com/avatars',
        mainServer: '1041312550777790524',
        inviteUrl: 'https://discord.gg/DFzqkuVges',
        admins: ['733784038199918683'], // 822468146131763257
    },
    reactStrictMode: false,
}

module.exports = nextConfig;
