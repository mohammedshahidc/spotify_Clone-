import {createSlice,createAsyncThunk}from '@reduxjs/toolkit'
import axiosInstance from '../../../axiosinstance'



export const getAllsongs=createAsyncThunk("songs",async()=>{
    try {
        const response=await axiosInstance.get('/user/getsongs')
         return response.data
         
    } catch (error) {
        console.log(error);
    }
})



const songSlice=createSlice({
    name:"songs",
    initialState:{
        songs:[],
        status:"none",
        currentSong: null,
        isPlaying: false,
        volume: 0.7,
        isShuffled: false,
        repeatMode: 0,    },
    reducers:{
        setCurrentsong: (state, action) => {
            state.currentSong = action.payload;
          },
          setPlaying: (state, action) => {
            state.isPlaying = action.payload;
          },
          setVolume: (state, action) => {
            state.volume = action.payload;
          },
          setRepeatMode: (state, action) => {
            state.repeatMode = action.payload;
          },
          toggleShuffle: (state) => {
            state.isShuffled = !state.isShuffled;
          },
    },
    extraReducers:(Builder)=>{
        Builder
        .addCase(getAllsongs.pending,(state)=>{
            state.status="pending"
        })
        .addCase(getAllsongs.fulfilled,(state,action)=>{
            state.songs= action.payload
            state.status="fulfilled"
        })
        .addCase(getAllsongs.rejected,(state)=>{
            state.status="rejected"
        })
    }

})


 export default songSlice.reducer
 export const {setCurrentsong,
    setPlaying,
    setVolume,
    setRepeatMode,
    toggleShuffle,}=songSlice.actions



