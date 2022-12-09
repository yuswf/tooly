async function getUserData(token, id) {
    const response = await fetch(process.env.apiEndPoint + '/users/' + id, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ` + token,
        },
    });

    return await response.json();
}
