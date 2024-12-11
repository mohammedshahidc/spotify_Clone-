import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import axiosInstance from '../../../axiosinstance'



export const getplaylist=createAsyncThunk("playlist",async()=>{
    try {
        const response=await axiosInstance.get('/user/getallplaylist')
        console.log('data:',typeof(response.data));
        return response.data
        
    } catch (error) {
        console.log(error);
        
    }
})

const playlistSlice=createSlice({
    name:'playlist',
    initialState:{
        playlist:[],
        status:'none'
        
    },
    reducers:{},
    extraReducers:(Builder)=>{
        Builder
        .addCase(getplaylist.pending,(state)=>{
            state.status="pending"
        }).addCase(getplaylist.fulfilled,(state,action)=>{
            
            state.playlist = Array.isArray(action.payload) ? action.payload : [action.payload]
            state.status="none"
        })
        .addCase(getplaylist.rejected,(state)=>{
            state.status="rejected"
        })
    }
})



export default playlistSlice.reducer


