import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../axiosinstance';

// Async thunk for fetching playlists
export const getplaylist = createAsyncThunk(
    "playlist/getAll",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get('/user/getallplaylist');
            if (!response.data) {
                throw new Error("No data received");
            }
            console.log("playlist data:", response.data);
            return response.data; // Assuming this is an array of playlists
        } catch (error) {
            console.error("API error:", error);
            return rejectWithValue(error.response?.data || "Failed to fetch playlists");
        }
    }
);

// Playlist slice
const playlistSlice = createSlice({
    name: 'playlist',
    initialState: {
        playlist: [],
        status: 'none', // 'none' | 'pending' | 'fulfilled' | 'rejected'
        error: null,    // To track errors
    },
    reducers: {}, // You can add synchronous reducers here if needed
    extraReducers: (builder) => {
        builder
            .addCase(getplaylist.pending, (state) => {
                state.status = "pending";
                state.error = null; // Reset error on new request
            })
            .addCase(getplaylist.fulfilled, (state, action) => {
                state.playlist = action.payload; 
                state.status = "fulfilled";
                state.error = null; 
            })
            .addCase(getplaylist.rejected, (state, action) => {
                state.status = "rejected";
                state.error = action.payload || "Failed to fetch playlists";
            });
    },
});

export default playlistSlice.reducer;
