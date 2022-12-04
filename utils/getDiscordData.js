async function getDiscordData(token) {
    const response = await fetch(process.env.apiEndPoint + '/users/@me', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return await response.json();
}

export default getDiscordData;
