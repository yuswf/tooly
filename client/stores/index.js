import {configureStore} from '@reduxjs/toolkit';

import userReducer from './user';
import stopWatchReducer from './StopWatch';
import ManuelTimerReducer from './ManuelTimer';
import ToDoReducer from './ToDo';
import noteReducer from './Note';

const store = configureStore({
    reducer: {
        user: userReducer,
        stopWatch: stopWatchReducer,
        manuelTimer: ManuelTimerReducer,
        todo: ToDoReducer,
        note: noteReducer,
    }
});

export default store;
