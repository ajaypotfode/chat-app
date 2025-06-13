import { configureStore } from "@reduxjs/toolkit";
import authReducer from './slice/authSlice'
import chatReducer from './slice/chatSlice'
import globalReducer from './slice/globalSlice'
import messageReducer from './slice/messageSlice'

const Store = configureStore({
    reducer: {
        global: globalReducer,
        auth: authReducer,
        chats: chatReducer,
        message: messageReducer
    }
})

export default Store