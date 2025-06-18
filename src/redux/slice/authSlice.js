import { signupUserAPI } from "@/service/authApiService";
import { signIn } from 'next-auth/react'
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const signupUser = createAsyncThunk("signUp", async (userData, { rejectWithValue }) => {
    try {
        const response = await signupUserAPI(userData)
        return response
    } catch (error) {
        return rejectWithValue(error.respones?.data)
    }
})


export const signInUser = createAsyncThunk("signin", async (loginData, { rejectWithValue }) => {
    try {
        const response = await signIn("credentials", {
            email: loginData.email,
            password: loginData.password,
            redirect: false,
            callbackUrl: "/",
        })
        // console.log("user Sign in is :",response);
        
        return response
    } catch (error) {
        return rejectWithValue(error.response?.data)
    }
})

export



    const initialState = {
        signUpData: {},
        loginData: {},
        // isLogin: false
    }


const authSlice = createSlice({
    name: "authentication",
    initialState,
    reducers: {
        getSignupData: (state, action) => {
            state.signUpData = action.payload
        },
        getLoginData: (state, action) => {
            state.loginData = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(signupUser.fulfilled, (state, action) => {
                state.signUpData = {}
                // console.log("sign up success");
            })
            .addCase(signInUser.fulfilled, (state, action) => {
                state.loginData = {}
                // state.isLogin = true
                // console.log("login success");
            })
        // .addCase
    }
})

export const { getSignupData, getLoginData } = authSlice.actions
export default authSlice.reducer