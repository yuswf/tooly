import {configureStore} from '@reduxjs/toolkit';

import userReducer from './user';
import stopWatchReducer from './StopWatch';

const store = configureStore({
    reducer: {
        user: userReducer,
        stopWatch: stopWatchReducer,
    }
});

export default store;
