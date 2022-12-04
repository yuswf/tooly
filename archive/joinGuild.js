async function joinGuild(token, id) {
    const res = await fetch(process.env.apiEndPoint + '/guilds/1041312550777790524/members/' + id, {
        method: 'PUT',
        body: JSON.stringify({
            access_token: `Bearer ` + token,
        }),
        headers: {
            Authorization: `Bot ${process.env.token}`,
            'Content-Type': 'application/json',
        },
    });
    const data = await res.json();

    console.log(data);
}

export default joinGuild;
