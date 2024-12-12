import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import axiosInstance from '../../../axiosinstance'

export const userlogin=createAsyncThunk('userlogin',async(userdata)=>{
    try {
        const response=await axiosInstance.post("/user/login",userdata)
        return response.data.data
    } catch (error) {
        console.log(error);
    }
})

const activeuser=JSON.parse(localStorage.getItem("current user"))||null

const loginSlice=createSlice({
    name:"curent user",
    initialState:{
        user :activeuser,
        status:null,
        token:localStorage.getItem("token") ||null,
        refreshmenttoken:localStorage.getItem("refreshmenttoken")||null
    },
    reducers:{
        logout:(state)=>{
            state.user=null
            state.status=null
            state.token=null
            state.refreshmenttoken=null
        }
    },

    extraReducers:(Builder)=>{
        Builder
        .addCase(userlogin.pending,(state)=>{
            state.user=null
            state.status="pending"
        })
        .addCase(userlogin.fulfilled,(state,action)=>{
            state.user=action.payload.user
            state.status=null
            state.token=action.payload.token
            state.refreshmenttoken=action.payload.refreshmenttoken
            localStorage.setItem("current user",JSON.stringify(action.payload.user))
            localStorage.setItem("token",JSON.stringify(action.payload.token))
            localStorage.setItem("refreshmenttoken",JSON.stringify(action.payload.refreshmenttoken))
        })
        .addCase(userlogin.rejected,(state)=>{
            state.status="rejected"
        })
    }
})

export default loginSlice.reducer
export const {logout}=loginSlice.actions