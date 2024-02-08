import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const userSlice = createSlice({
    name: "user",
    initialState: {
        isLoggedIn: false,
        status: "idle"
    },
    reducers:{
        login(state,action){
            state.isLoggedIn = true;
            state.status = "loggedin"
        },
        logout (state,action){
            state.isLoggedIn = false
            state.status = "logout"
        }
    },
    extraReducers: (builder)=>{
        builder
        .addCase(logIn.fulfilled,(state,action)=>{
        state.isLoggedIn = true
        state.status = "loggedin"
        })
        .addCase(signUp.fulfilled,(state,action)=>{
            state.isLoggedIn = false
            state.status = "signup"
            if(action.payload.data.message === "User already exists"){
                state.status = "already"
            }
        })
        .addCase(logOut.fulfilled,(state,action)=>{
            state.status = "logout"
        })
    }
})

export const {login, logout} = userSlice.actions;
export default userSlice.reducer

export const logIn = createAsyncThunk("user/login", async(obj)=>{
    const {email,password} = obj;
    
    const response = await axios.post("/api/api/v1/login",{
        email,password
    })

    return response
})

export const signUp = createAsyncThunk("user/signup",async(obj)=>{
    const {name,email,password} = obj;
    
    const response = await axios.post("/api/api/v1/signup",{
        name,email,password
    })
    return response
})

export const logOut = createAsyncThunk("user/logout",async()=>{
   const response = await axios.post("/api/api/v1/logout")
   return response
})

