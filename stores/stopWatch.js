import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    hours: 0,
    minutes: 0,
    seconds: 0,
    milliseconds: 0,
    startedTime: null,
    isRunning: false,
    lapTime: typeof window !== 'undefined' ? Number(window.localStorage.getItem('lapTime')) || 0 : 0,
    fullScreenMode: false,
}

export const stopWatchSlice = createSlice({
    name: 'stopWatch',
    initialState,
    reducers: {
        setHours: (state, action) => {
            state.hours = action.payload;
        },
        setMinutes: (state, action) => {
            state.minutes = action.payload;
        },
        setSeconds: (state, action) => {
            state.seconds = action.payload;
        },
        setMilliseconds: (state, action) => {
            state.milliseconds = action.payload;
        },
        setStartedTime: (state, action) => {
            state.startedTime = action.payload;
        },
        setIsRunning: (state, action) => {
            state.isRunning = action.payload;
        },
        setLapTime: (state, action) => {
            state.lapTime = action.payload;
        },
        setFullScreenMode: (state, action) => {
            state.fullScreenMode = action.payload;
        }
    }
});

export const {setHours, setMinutes, setSeconds, setMilliseconds, setStartedTime, setIsRunning, setLapTime, setFullScreenMode} = stopWatchSlice.actions;
export default stopWatchSlice.reducer;
