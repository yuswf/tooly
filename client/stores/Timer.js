import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    time: 1,
    isRunning: false,
    selected: 'secs',
    hours: 0,
    minutes: 0,
    seconds: 0,
    ms: 0,
}

export const TimerSlice = createSlice({
    name: 'timer',
    initialState,
    reducers: {
        setHours: (state, action) => {
            state.seconds = 0;
        },
        setMinutes: (state, action) => {
            state.minutes = action.payload;
        },
        setSeconds: (state, action) => {
            state.seconds = action.payload;
        },
        setIsRunning: (state, action) => {
            state.isRunning = !state.isRunning;
        },
        setSelected: (state, action) => {
            state.selected = action.payload;
        },
        setTime: (state, action) => {
            state.time = action.payload;
        },
        setMs: (state, action) => {
            state.ms = Number(action.payload);
        }
    }
});

export const {setHours, setMinutes, setSeconds, setIsRunning, setSelected, setTime, setMs} = TimerSlice.actions;
export default TimerSlice.reducer;
