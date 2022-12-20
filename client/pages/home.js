import {useEffect} from 'react';
import {useRouter} from 'next/router';

import LoaderComponent from '../components/Loader.component';

function Home() {
    const router = useRouter();

    useEffect(() => {
        router.push('/');
    }, []);

    return <LoaderComponent color="#5865F2" />
}

export default Home;
