import OAuth from '../../utils/oauth';
import {setToken} from '../../database/firebase';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const response = await OAuth(req.query.code);

        if (response.error) {
            res.redirect('/check?error=' + response.error);
        } else {
            const result = await setToken(response.access_token);

            if (!result) {
                res.redirect('/check?error=Something%20went%20wrong');
            } else {
                await setToken(response.access_token);

                res.redirect('/check?token=' + response.access_token);
            }
        }
    }
}