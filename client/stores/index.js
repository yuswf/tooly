import {configureStore} from '@reduxjs/toolkit';

import userReducer from './user';
import stopWatchReducer from './StopWatch';
import ManuelTimerReducer from './ManuelTimer';

const store = configureStore({
    reducer: {
        user: userReducer,
        stopWatch: stopWatchReducer,
        manuelTimer: ManuelTimerReducer,
    }
});

export default store;
