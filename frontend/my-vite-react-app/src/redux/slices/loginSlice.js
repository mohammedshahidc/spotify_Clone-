import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../axiosinstance';

export const userlogin = createAsyncThunk(
    'userlogin',
    async (userdata, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post('/user/login', userdata);
            console.log('Response user:', response.data.data);
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

export const edituser = createAsyncThunk("edit user", async (formData) => {
    try {
        const response = await axiosInstance.put("/user/edituser", formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data.data;
    } catch (error) {
        throw new Error(error.response ? error.response.data.message : 'Failed to edit user.');
    }
});

const activeuser = (() => {
    const userString = localStorage.getItem('current user');
    if (userString && userString !== 'undefined') {
        try {
            return JSON.parse(userString);
        } catch (error) {
            console.error('Error parsing current user:', error);
            return null; // Handle error as needed
        }
    }
    return null; // Return null if userString is invalid
})();



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
            state.profilePicture = null;
            localStorage.removeItem('current user');
            localStorage.removeItem('token');
            localStorage.removeItem('refreshmenttoken');
            localStorage.removeItem('profilepicture');
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
                const userData = {
                    user: action.payload.user,
                    token: action.payload.token,
                    refreshmenttoken: action.payload.refreshmenttoken,
                    profilePicture: action.payload.profilePicture
                };

                state.user = userData.user;
                state.status = 'fulfilled';
                state.token = userData.token;
                state.refreshmenttoken = userData.refreshmenttoken;
                state.profilePicture = userData.profilePicture;

                // Save to localStorage as JSON
                localStorage.setItem('current user', JSON.stringify(userData.user));
                localStorage.setItem('token', userData.token);
                localStorage.setItem('refreshmenttoken', userData.refreshmenttoken);
                localStorage.setItem('profilepicture', JSON.stringify(userData.profilePicture));
            })
            .addCase(userlogin.rejected, (state, action) => {
                state.user = null;
                state.status = 'rejected';
                state.error = action.payload || 'Login failed.';
            })
            .addCase(edituser.pending, (state) => {
                state.status = null;
            })
            .addCase(edituser.fulfilled, (state, action) => {
                state.user = action.payload.name;  // Assuming action.payload.name is the updated name
                state.profilePicture = action.payload.profilePicture; // Ensure this is the updated picture
                console.log('profile:', action.payload);
                state.status = 'fulfilled';
                localStorage.setItem('current user', state.user);
                localStorage.setItem('profilepicture', state.profilePicture);
            })

            .addCase(edituser.rejected, (state) => {
                state.status = 'rejected';
            })
    },
});

export default loginSlice.reducer;
export const { logout } = loginSlice.actions;
