import {createSlice,createAsyncThunk}from '@reduxjs/toolkit'
import axiosInstance from '../../../axiosinstance'



export const getfavourite=createAsyncThunk("favourite",async()=>{
    try {
        const response=await axiosInstance.get('/user/getfavourite')
        console.log("favourite:",response.data);
         return response.data
         
    } catch (error) {
        console.log(error);
    }
})



const favouriteSlice=createSlice({
    name:"favourite",
    initialState:{
        favourite:[],
        status:"none"
    },
    reducers:{},
    extraReducers:(Builder)=>{
        Builder
        .addCase(getfavourite.pending,(state)=>{
            state.status="pending"
        })
        .addCase(getfavourite.fulfilled,(state,action)=>{
            state.albums= action.payload
            state.status="fulfilled"
        })
        .addCase(getfavourite.rejected,(state)=>{
            state.status="rejected"
        })
    }

})


 export default favouriteSlice.reducer



