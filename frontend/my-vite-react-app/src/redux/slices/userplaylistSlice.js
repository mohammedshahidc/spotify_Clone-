import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../axiosinstance';


export const getuserplaylist = createAsyncThunk(
    "playlist/getuser",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get('/user/getplaylist');
            if (!response.data) {
                throw new Error("No data received");
            }
            console.log("playlist data:", response.data);
            return response.data;
        } catch (error) {
            console.error("API error:", error);
            return rejectWithValue(error.response?.data || "Failed to fetch playlists");
        }
    }
);


const userplaylistslice = createSlice({
    name: 'userplaylist',
    initialState: {
        userplaylist: [],
        status: 'none', 
        error: null,    
    },
    reducers: {}, 
    extraReducers: (builder) => {
        builder
            .addCase(getuserplaylist.pending, (state) => {
                state.status = "pending";
                state.error = null; 
            })
            .addCase(getuserplaylist.fulfilled, (state, action) => {
                state.userplaylist= action.payload; 
                state.status = "fulfilled";
                state.error = null; 
            })
            .addCase(getuserplaylist.rejected, (state, action) => {
                state.status = "rejected";
                state.error = action.payload || "Failed to fetch playlists";
            });
    },
});

export default userplaylistslice.reducer;
