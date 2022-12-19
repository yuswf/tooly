import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    isRunning: false,
}

export const ManuelTimerSlice = createSlice({
    name: 'ManuelTimer',
    initialState,
    reducers: {
        setIsRunning: (state, action) => {
            state.isRunning = action.payload;
        },
    }
});

export const {setIsRunning} = ManuelTimerSlice.actions;
export default ManuelTimerSlice.reducer;
