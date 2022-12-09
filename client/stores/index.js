import {configureStore} from '@reduxjs/toolkit';

import userReducer from './user';
import stopWatchReducer from './stopWatch';
import TimerReducer from './Timer';

const store = configureStore({
    reducer: {
        user: userReducer,
        stopWatch: stopWatchReducer,
        timer: TimerReducer,
    }
});

export default store;
