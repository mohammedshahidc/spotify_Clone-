import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../axiosinstance';

export const userlogin = createAsyncThunk(
    'userlogin',
    async (userdata, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post('/user/login', userdata);
            console.log('Response userrrrrrrrrrrr:', response.data.data);

            return response.data.data;
        } catch (error) {
            if (error.response) {
                console.error('Error response:', error.response.data.message);
                return rejectWithValue(error.response.data.message);
            }
            console.error('Login error:', error.message);
            return rejectWithValue('An unknown error occurred.');
        }
    }
);

const activeuser =
    localStorage.getItem('current user') !== 'undefined'
        ? JSON.parse(localStorage.getItem('current user'))
        : null;

const loginSlice = createSlice({
    name: 'current user',
    initialState: {
        user: activeuser,
        status: null,
        token: localStorage.getItem('token') || null,
        refreshmenttoken: localStorage.getItem('refreshmenttoken') || null,
        profilePicture:null,
        error: null,
    },
    reducers: {
        logout: (state) => {
            state.user = null;
            state.status = null;
            state.token = null;
            state.refreshmenttoken = null;
            state.profilePicture=null
            localStorage.removeItem('current user');
            localStorage.removeItem('token');
            localStorage.removeItem('refreshmenttoken');
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(userlogin.pending, (state) => {
                state.user = null;
                state.status = 'pending';
                state.error = null;
            })
            .addCase(userlogin.fulfilled, (state, action) => {
                state.user = action.payload.user;
                console.log(' action.payload.user:', action.payload);
                state.status = 'fulfilled';
                state.token = action.payload.token;
                state.refreshmenttoken = action.payload.refreshmenttoken;
                state.profilePicture=action.payload.profilePicture
                localStorage.setItem('current user', JSON.stringify(action.payload.user));
                localStorage.setItem('token', action.payload.token);
                localStorage.setItem('refreshmenttoken', action.payload.refreshmenttoken);
                localStorage.setItem("profilepicture",action.payload.profilePicture)
            })
            .addCase(userlogin.rejected, (state, action) => {
                state.user = null;
                state.status = 'rejected';
                state.error = action.payload || 'Login failed.';
            });
    },
});

export default loginSlice.reducer;
export const { logout } = loginSlice.actions;
