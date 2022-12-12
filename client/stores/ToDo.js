import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    todo: {}
};

export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        setTodo: (state, action) => {
            state.todo = action.payload;
        },
    },
});

export const {setTodo} = todoSlice.actions;
export default todoSlice.reducer;
