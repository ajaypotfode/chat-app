
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getProfileDataAPI, updateBioAPI } from "@/service/profileService";


export const getProfile = createAsyncThunk("getProfileData", async (_, { rejectWithValue }) => {
    try {
        const response = await getProfileDataAPI()
        return response
    } catch (error) {
        return rejectWithValue(error.respones?.data)
    }
})


export const changeBio = createAsyncThunk("changeBio", async (bio, { rejectWithValue }) => {
    try {
        const response = await updateBioAPI(bio)

        return response
    } catch (error) {
        return rejectWithValue(error.response?.data)
    }
})

export



    const initialState = {
        profileData: {},
        bio: '',
        isUpdate: false
        // isLogin: false
    }


const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        getNewBio: (state, action) => {
            state.bio = action.payload
        },
        setIsUpdate: (state, action) => {
            // console.log("is update is :",!state.isupdate);
            
            state.isUpdate = !state.isUpdate
            state.bio = action.payload
        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(getProfile.fulfilled, (state, action) => {
                state.profileData = action.payload.result
                // console.log("sign up success");
            })
            .addCase(changeBio.fulfilled, (state, action) => {
                state.profileData= action.payload?.result
                state.isUpdate=false
            })
        // .addCase
    }
})

export const { getNewBio, setIsUpdate } = profileSlice.actions
export default profileSlice.reducer