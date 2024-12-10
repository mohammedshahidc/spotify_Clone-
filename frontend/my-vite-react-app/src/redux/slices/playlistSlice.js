import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import axiosInstance from '../../../axiosinstance'


const playlistSlice=createSlice({
    name:'playlist',
    initialState:{
        playlist:[],
        status:'none'
        
    },
    reducers:{},
    extraReducers:(Builder)=>{
        Builder.addCase(getplaylist.fulfilled,(state,action)=>{
            state.playlist.push(action.payload)
            state.status="none"
        })
        .addCase(getplaylist.pending,(state,action)=>{
            state.status="pending"
        })
        .addCase(getplaylist.rejected,(state,action)=>{
            state.status="rejected"
        })
    }
})



export default playlistSlice.reducer


export const getplaylist=createAsyncThunk("playlist",async()=>{
    try {
        const response=await axiosInstance.get('/user/getallplaylist')
        console.log('data:',typeof(response.data));
        return response.data
        
    } catch (error) {
        console.log(error);
        
    }
})