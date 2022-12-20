import {useRouter} from 'next/router';

function Home() {
    const router = useRouter();

    return router.push('/');
}

export default Home;
