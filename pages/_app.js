import {SkeletonTheme} from 'react-loading-skeleton';

import '../styles/globals.css';
import '../styles/style.css';
import 'react-loading-skeleton/dist/skeleton.css';

import {Provider} from 'react-redux';
import store from '../stores';

function App({Component, pageProps}) {
    return <Provider store={store}>
        <SkeletonTheme baseColor="#202020" highlightColor="#444">
            <Component {...pageProps} />
        </SkeletonTheme>
    </Provider>
}

export default App;
