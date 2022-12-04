import {useEffect} from 'react';
import {useRouter} from 'next/router';
import {useDispatch} from 'react-redux';

import {set, setData} from '../stores/user';

import LoaderComponent from '../components/Loader.component';

function Logout() {
    const dispatch = useDispatch();
    const router = useRouter();

    useEffect(() => {
        if (!sessionStorage.getItem('token')) return () => router.push('/');

        setTimeout(() => {
            sessionStorage.removeItem('token');
            dispatch(set(''));
            dispatch(setData({}));

            router.push('/');
        }, 5000)
    }, [dispatch]);

    return (
        <LoaderComponent color="#5865F2" />
    )
}

export default Logout;
