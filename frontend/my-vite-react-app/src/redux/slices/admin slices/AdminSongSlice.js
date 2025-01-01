import {createSlice,createAsyncThunk}from '@reduxjs/toolkit'
import axiosInstance from '../../../../axiosinstance'



export const getAlladminSongs=createAsyncThunk("songs",async()=>{
    try {
        const response=await axiosInstance.get('/admin/getallsongs')
        console.log("songdata:",response.data)
         return response.data
         
    } catch (error) {
        console.log(error);
    }
})



const AdminSongSlice=createSlice({
    name:"adminSongs",
    initialState:{
        adminSongs:[],
        status:"none"
    },
    reducers:{},
    extraReducers:(Builder)=>{
        Builder
        .addCase(getAlladminSongs.pending,(state)=>{
            state.status="pending"
        })
        .addCase(getAlladminSongs.fulfilled,(state,action)=>{
            state.adminSongs= action.payload
            state.status="fulfilled"
        })
        .addCase(getAlladminSongs.rejected,(state)=>{
            state.status="rejected"
        })
    }

})


 export default AdminSongSlice.reducer



