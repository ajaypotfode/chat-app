"use client"
import { addChats, deleteChat, getChatData, getchatForm, getChats, getUsers } from "@/redux/slice/chatSlice";
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify";

const UseChatData = () => {
    const { chatData, chats, chatForm } = useSelector((state) => state.chats)
    const dispatch = useDispatch();

    const handleChataData = (e) => {
        const { name, value } = e.target
        dispatch(getChatData({ ...chatData, [name]: value }))
    }

    const handleChatForm = () => {
        dispatch(getchatForm())
    }

    const fetchChatData = () => {
        dispatch(getChats())
    }

    const generateChat = async (e) => {
        // e.preventDefault()
        e.preventDefault()
        const users = await dispatch(getUsers({ email: chatData.email })).unwrap()

        if (!users.success) {
            toast.error(`${users?.message}`)
            return
        }
        
        dispatch(addChats({ recieverId: users.result?._id }))
    }

    const handleDeleteChat = (chatId) => {
        dispatch(deleteChat(chatId))
    }


    return {
        handleChataData,
        handleChatForm,
        fetchChatData,
        generateChat,
        handleDeleteChat,
        chatData,
        chatForm,
        chats,

    }
}

export default UseChatData
