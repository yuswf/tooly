async function oauth(code) {
    const res = await fetch(process.env.apiEndPoint + '/oauth2/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            client_id: process.env.clientId,
            client_secret: process.env.clientSecret,
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: process.env.redirectUri,
        })
    });

    return await res.json();
}

export default oauth;
