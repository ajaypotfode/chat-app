"use client"
// import { addChats, deleteChat, getChatData, getchatForm, getChats, getUsers } from "@/redux/slice/chatSlice";
import { addMessage, getCurrentChat, getLoginUser, getMessage, getMessageData, getSocketMessage } from "@/redux/slice/messageSlice";
import { useDispatch, useSelector } from "react-redux"
import socket from '@/utils/clientSocket'
// import { toast } from "react-toastify";
// import { sendError } from "next/dist/server/api-utils";

const UseMessageData = () => {
    const { messageData, messages, socketMessage, currentChat } = useSelector((state) => state.message)
    const dispatch = useDispatch();

    const handleMessageData = (e) => {
        const { name, value } = e.target
        dispatch(getMessageData({ ...messageData, [name]: value }))
    }

    // const handleChatForm = () => {
    //     dispatch(getchatForm())
    // }

    const fetchMessageData = (messageData) => {
        // dispatch(getCurrentChat(messageData))
        dispatch(getMessage(messageData))
    }



    const addMessageData = (chatId, receiverId) => {


        console.log("sender Id is :",currentChat.senderId);
        
        const data = {
            content: messageData.message,
            sender: currentChat.senderId,
            chatId: chatId,
            // participants
        }
        socket.emit('private-message', data)
        // dispatch(getSocketMessage({ chatId, message: { clientMsg: messageData.message } }))

        dispatch(addMessage({ chatId, message: messageData.message }))
    }

    return {
        handleMessageData,
        fetchMessageData,
        addMessageData,
        messageData,
        messages,
        socketMessage,
        currentChat

    }
}

export default UseMessageData
