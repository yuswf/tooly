import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import useSWR from 'swr';
import {Toaster} from 'react-hot-toast';

import {set, setGuilds} from '../stores/user';
import {checkToken} from '../database/firebase';
import LoginComponent from '../components/Login.component';
import LoaderComponent from '../components/Loader.component';
import HomeComponent from '../components/Home.component';

function Home() {
    const dispatch = useDispatch();
    const {user} = useSelector(state => state.user);

    const fetcher = url => fetch(url, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        }
    }).then(r => r.json());
    const {data: Data} = useSWR(user !== '' && user !== null && user !== false ? process.env.apiEndPoint + '/users/@me/guilds?limit=200' : null, fetcher);

    if (user !== '' && user !== null && user !== false) {
        dispatch(setGuilds(Data));
    }

    useEffect(() => {
        if (sessionStorage.getItem('token')) {
            checkToken(sessionStorage.getItem('token'))
                .then((result) => {
                    if (!result) {
                        dispatch(set(false));
                        sessionStorage.removeItem('token');
                    }

                    dispatch(set(sessionStorage.getItem('token')));
                });
        } else {
            dispatch(set(false));
        }
    }, []);

    if (user !== '' && user !== null && user !== false) {
        return <HomeComponent/>
    } else {
        return (
            <div className="main">
                {user === '' ? <LoaderComponent color="#5865F2"/> : <LoginComponent/>}
            </div>
        )
    }
}

export default Home;
