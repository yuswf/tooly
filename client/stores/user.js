import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    user: '',
    data: {},
    getGuilds: [],
    onlineUsers: [],
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
        },
        setOnlineUser: (state, action) => {
            state.onlineUsers = action.payload;
        },
    },
});

export const {set, setData, setGuilds, setOnlineUser} = userSlice.actions;
export default userSlice.reducer;
