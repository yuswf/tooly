import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    note: '',
    editing: false,
    eI: null,
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
        setEditing: (state, action) => {
            state.editing = !state.editing;
        },
        setIndex: (state, action) => {
            state.eI = action.payload;
        }
    }
});

export const {setNote, setNotes, setEditing, setIndex} = noteSlice.actions;
export default noteSlice.reducer;
