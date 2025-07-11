import { signupUserAPI } from "@/service/authApiService";
import { signIn } from 'next-auth/react'
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addChatAPI, deleteChatAPI, getChatAPI, getUsersAPI } from "@/service/chatApiService";


export const getChats = createAsyncThunk("getChats", async (_, { rejectWithValue }) => {
    try {
        const response = await getChatAPI()
        return response
    } catch (error) {
        return rejectWithValue(error.respones?.data)
    }
})


export const addChats = createAsyncThunk("addChats", async (chatData, { rejectWithValue }) => {
    try {
        const response = await addChatAPI(chatData)

        if (!response.success) {
            return rejectWithValue(response)
        }

        return response
    } catch (error) {
        return rejectWithValue(error.response?.data)
    }
})



export const deleteChat = createAsyncThunk("deleteChat", async (chatId, { rejectWithValue }) => {
    try {
        const response = await deleteChatAPI(chatId)

        if (!response.success) {
            return rejectWithValue(response)
        }

        return response.result?._id
    } catch (error) {
        return rejectWithValue(error.response?.data)
    }
})


export const getUsers = createAsyncThunk("getUsers", async (userData, { rejectWithValue }) => {
    try {
        const response = await getUsersAPI(userData)
        return response
    } catch (error) {
        return rejectWithValue(error.response?.data)
    }
})




const initialState = {
    chatData: {},
    chats: [],
    chatForm: null,
    sidebar: true
    // avatarBg:{},
}


const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        getChatData: (state, action) => {
            state.chatData = action.payload
        },
        getLastMessageDate: (state, action) => {
            const { chatId, date, unseenCount } = action.payload
            const chat = state.chats.find(chat => chat._id === chatId)
            if (chat) {
                chat.lastMessageDate = date
            }
        },
        getUnseenMessageCount: (state, action) => {
            // const { chatId, unseenCount } = action.payload
            const { count, chatId } = action.payload
            const chat = state.chats.find(chat => chat._id === chatId)
            if (chat) {
                chat.unseenCount = chat.unseenCount + count
            }
        },
        clearUnseenMessageCount: (state, action) => {
            const chatId = action.payload

            const chat = state.chats.find(chat => chat._id === chatId)
            if (chat) {
                chat.unseenCount = 0
            }
        },
        getchatForm: (state, action) => {
            if (action.payload === 'addChat') {
                state.chatData = {}
            }
            state.chatForm = action.payload
        },
        handleSidebar: (state, action) => {
            state.sidebar = !state.sidebar
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getChats.fulfilled, (state, action) => {
                state.chats = action.payload?.result
                // console.log("chats is :", action.payload);
            })
            .addCase(addChats.fulfilled, (state, action) => {
                state.chatData = {}
                state.chatForm = false
                state.chats.push(action.payload.result)
            })
            .addCase(deleteChat.fulfilled, (state, action) => {
                // state.
                state.chats = state.chats.filter(chat => chat._id !== action.payload)
            })
    }
})

export const { getChatData, getchatForm, getLastMessageDate, getUnseenMessageCount, clearUnseenMessageCount,handleSidebar } = chatSlice.actions
export default chatSlice.reducer