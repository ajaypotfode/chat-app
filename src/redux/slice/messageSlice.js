
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addChatMessageAPI, getChatMessageAPI } from "@/service/messageApiService";


export const getMessage = createAsyncThunk("getMessage", async (messageData, { rejectWithValue }) => {
    try {
        const response = await getChatMessageAPI(messageData)

        // console.log("response in asyncthunk:",response);

        if (!response.success) {
            return rejectWithValue(response)
        }
        return response
    } catch (error) {
        return rejectWithValue(error.respones?.data)
    }
})


export const addMessage = createAsyncThunk("addMessage", async (messageData, { rejectWithValue }) => {
    try {
        const response = await addChatMessageAPI(messageData)

        return response
    } catch (error) {
        return rejectWithValue(error.response?.data)
    }
})


const initialState = {
    messageData: {},
    messages: [],
    socketMessage: {},
    currentChat: {}
}


const messageSlice = createSlice({
    name: "message",
    initialState,
    reducers: {
        getMessageData: (state, action) => {
            state.messageData = action.payload
        },
        getSocketMessage: (state, action) => {
            if (action.payload.chatId === state.currentChat.chatId) {
                // console.log("message s :", action.payload)
                state.messages[0].messages.push(action.payload)
            }

        },
        getCurrentChat: (state, action) => {
            // console.log("current Chat Id is: :", action.payload);

            state.currentChat = action.payload
        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(getMessage.fulfilled, (state, action) => {
                state.messages = action.payload?.result
                state.currentChat.chatId = action.payload?.result[0]?.chatId
                state.currentChat.senderId = action.payload?.result[0]?.senderId
            })
            .addCase(addMessage.fulfilled, (state, action) => {
                state.messageData = {}
            })
    }
})

export const { getMessageData, getSocketMessage, getCurrentChat } = messageSlice.actions
export default messageSlice.reducer