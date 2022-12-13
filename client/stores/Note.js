import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    note: '',
    notes: typeof window !== 'undefined' ? JSON.parse(window.localStorage.getItem('notes')) || [] : [],
}

export const noteSlice = createSlice({
    name: 'stopWatch',
    initialState,
    reducers: {
        setNotes: (state, action) => {
            state.notes = action.payload;
        },
        setNote: (state, action) => {
            state.note = action.payload;
        },
    }
});

export const {setNote, setNotes} = noteSlice.actions;
export default noteSlice.reducer;
