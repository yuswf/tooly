import {useEffect} from 'react';
import {useRouter} from 'next/router';

import LoaderComponent from '../components/Loader.component';
import {checkToken} from '../database/firebase';

function Check() {
    const router = useRouter();
    const {token, error} = router.query;

    useEffect(() => {
        if (token !== undefined && error === undefined) {
            checkToken(token)
                .then((result) => {
                    if (result) {
                        localStorage.setItem('token', token.toString());

                        router.push('/');
                    } else {
                        router.push('/?error=invalid_token');
                    }
                });
        }
    }, [token !== undefined]);

    useEffect(() => {
        if (error !== undefined && token === undefined) {
            router.push('/?error=' + error);
        }
    }, [error !== undefined]);

    return (
        <LoaderComponent color="#5865F2" />
    )
}

export default Check;
