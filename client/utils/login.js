function login(router) {
    const scopes = [
        'identify',
        'email',
        'guilds',
        'guilds.join'
    ];
    const uri = process.env.authorization + '?' +
        'response_type=code' +
        `&client_id=${process.env.clientId}` +
        `&scope=${encodeURIComponent(scopes.join(' '))}` +
        `&redirect_uri=${encodeURIComponent(process.env.redirectUri)}`;

    router.push(uri);
}

export default login;
