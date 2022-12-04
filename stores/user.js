import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    user: '',
    data: {},
    getGuilds: [],
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        set: (state, action) => {
            state.user = action.payload;
        },
        setData: (state, action) => {
            state.data = action.payload;
        },
        setGuilds: (state, action) => {
            state.getGuilds = action.payload;
        }
    },
});

export const {set, setData, setGuilds} = userSlice.actions;
export default userSlice.reducer;
