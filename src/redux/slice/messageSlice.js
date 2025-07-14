
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addChatMessageAPI, clearUnseenMessageAPI, getChatMessageAPI } from "@/service/messageApiService";


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


export const clearBackendUnseenMessageCount = createAsyncThunk("clearBackendUnseenMessageCount", async (chatId, { rejectWithValue }) => {
    try {
        // console.log("call Clear Unseen in Slice");
        const response = await clearUnseenMessageAPI(chatId)
        return response
    } catch (error) {
        return rejectWithValue(error.respones?.data)
    }
})



const initialState = {
    messageData: {},
    messages: [],
    socketMessage: {},
    currentChat: {},
    // currentReciever:{}
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
                console.log("messaeges is :", action.payload?.result[0]);

                state.messages = action.payload?.result
                state.currentChat.chatId = action.payload?.result[0]?.chatId
                state.currentChat.senderId = action.payload?.result[0]?.senderId
                state.currentChat.receiverId = action.payload?.result[0]?.receiverId?._id

                // console.log("reciver id in redux:",action.payload?.result[0]?.receiverId?._id);

            })
            .addCase(addMessage.fulfilled, (state, action) => {
                state.messageData = {}
            })
    }
})

export const { getMessageData, getSocketMessage, getCurrentChat } = messageSlice.actions
export default messageSlice.reducer