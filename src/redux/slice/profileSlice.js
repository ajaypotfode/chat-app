
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getProfileDataAPI, updateBioAPI, updateProfilePictureAPI } from "@/service/profileService";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { imageDb } from "@/service/firebaseService";


// export const updateProfileImage = createAsyncThunk("updateProfileimage", async (Image, { rejectWithValue }) => {
//     try {
//         const response = await getProfileDataAPI()
//         return response
//     } catch (error) {
//         return rejectWithValue(error.respones?.data)
//     }
// })

export const uploadImage = createAsyncThunk("uploadImage", async (image, { rejectWithValue }) => {
    try {
        const imageRef = ref(imageDb, `chat-app/${image.name}`);
        const metadata = { contentType: image.type };
        const uploadResult = await uploadBytes(imageRef, image, metadata);
        // console.log("image Url Is :", uploadResult);
        return await getDownloadURL(uploadResult.ref);
    } catch (error) {
        return rejectWithValue(err.message)
    }
}
);


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



export const updateProfilePicture = createAsyncThunk("updateProfilePicture", async (image, { rejectWithValue }) => {
    try {
        // console.log("image in async thunk is :", image);

        const response = await updateProfilePictureAPI(image)

        return response
    } catch (error) {
        return rejectWithValue(error.response?.data)
    }
})



const initialState = {
    profileData: {},
    bio: '',
    isUpdate: false,
    image: null
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
            state.isUpdate = !state.isUpdate
            state.bio = action.payload
        },

    },
    extraReducers: (builder) => {
        builder
            .addCase(getProfile.fulfilled, (state, action) => {
                state.profileData = action.payload.result
                // console.log("sign up success");
            })
            .addCase(changeBio.fulfilled, (state, action) => {
                state.profileData = action.payload?.result
                state.isUpdate = false
            })
            .addCase(uploadImage.fulfilled, (state, action) => {
                // console.log("image of firebase is :", action.payload);
                state.image = action.payload
            })
            .addCase(uploadImage.rejected, (state, action) => {
                state.image = null
            })
            .addCase(updateProfilePicture.fulfilled, (state, action) => {
                // console.log("action payload is :", action.payload.result);

                state.profileData = action.payload?.result
                state.image = null
            })
    }
})

export const { getNewBio, setIsUpdate } = profileSlice.actions
export default profileSlice.reducer