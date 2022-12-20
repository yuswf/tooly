import {useEffect} from 'react';
import {useRouter} from 'next/router';

import LoaderComponent from '../components/Loader.component';

function Home() {
    const router = useRouter();

    useEffect(() => {
        return () => router.push('/');
    }, []);

    return <LoaderComponent />
}

export default Home;
