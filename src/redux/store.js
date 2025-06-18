import { configureStore } from "@reduxjs/toolkit";
import authReducer from './slice/authSlice'
import chatReducer from './slice/chatSlice'
import globalReducer from './slice/globalSlice'
import messageReducer from './slice/messageSlice'
import profileReducer from './slice/profileSlice'

const Store = configureStore({
    reducer: {
        global: globalReducer,
        auth: authReducer,
        chats: chatReducer,
        message: messageReducer,
        profile: profileReducer
    }
})

export default Store