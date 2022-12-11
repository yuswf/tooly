async function sendToUser(id, records, msToTime) {
    try {
        const response = await fetch(process.env.apiEndPoint + '/users/@me/channels', {
            method: 'POST',
            headers: {
                Authorization: "Bot " + process.env.token,
                'Content-Type': 'application/json',
                'Allow-Access-Control-Origin': '*',
            },
            body: JSON.stringify({
                recipient_id: id,
            }),
        });
        const data = await response.json();
        const {id: channelId} = data;
        const fields = [
            ...records.map((record, index) => {
                return {
                    "name": record.time,
                    "value": msToTime(index !== 0 ? record.ms - records[index - 1].ms : record.ms),
                }
            })
        ];

        const res = await fetch(process.env.apiEndPoint + '/channels/' + channelId + '/messages', {
            method: 'POST',
            body: JSON.stringify({
                "embeds": [{
                    "title": "Your Records",
                    "description": "Here are your records",
                    "color": 0x00ff00,
                    "fields": fields,
                }],
            }),
            headers: {
                Authorization: "Bot " + process.env.token,
                'Content-Type': 'application/json',
            }
            /*
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Alow-Access-Control-Origin': '*',
            */
        });
        const json = await res.json();

        console.log(json);

        return json;
    } catch (e) {
        console.log(e);
        return false;
    }
}

export default sendToUser;
