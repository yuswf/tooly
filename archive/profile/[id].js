import {useEffect, useState} from 'react';
import {useRouter} from 'next/router';

import getUserData from '../getUserData';
import Skeleton from "react-loading-skeleton";

function Profile() {
    const router = useRouter();
    const {id} = router.query;
    const [user, setUser] = useState(null);
    const [uid, setId] = useState('');

    async function aFunc() {
        if (uid !== '' && uid !== undefined) {
            const data = await getUserData(sessionStorage.getItem('token'), uid);

            setUser(data);
        }
    }

    useEffect(() => setId(id), []);

    useEffect(() => {
        aFunc();
    }, [uid]);


    console.log(user)
    return (
        <>
            {id}'li elemanın profili :haha:
            <br/>
        </>
    )
}

export default Profile;
