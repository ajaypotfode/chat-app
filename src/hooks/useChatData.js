"use client"
import { addChats, deleteChat, getChatData, getchatForm, getChats, getUsers, handleSidebar } from "@/redux/slice/chatSlice";
import { format, parseISO } from "date-fns";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify";

const UseChatData = () => {
    const { chatData, chats, chatForm, sidebar } = useSelector((state) => state.chats)
    const { loading } = useSelector((state) => state.global)
    const dispatch = useDispatch();
    // const [sidebar, setSidebar] = useState(true)



    const handleChataData = (e) => {
        const { name, value } = e.target
        dispatch(getChatData({ ...chatData, [name]: value }))
    }

    const handleChatForm = (value) => {
        dispatch(getchatForm(value))
    }

    const fetchChatData = () => {
        dispatch(getChats())
    }

    const generateChat = async (e) => {
        // e.preventDefault()
        e.preventDefault()
        const users = await dispatch(getUsers({ email: chatData.email })).unwrap()

        if (!users.success) {
            toast.error(`${users.message}`)
            return
        }

        dispatch(addChats({ recieverId: users.result?._id }))

    }

    const handleDeleteChat = (chatId) => {
        dispatch(deleteChat(chatId))
    }

    const formatedLastMessaeDate = (date) => {
        const todaysDate = format(new Date(), 'yyyy-MM-dd');

        if (todaysDate === format(date, 'yyyy-MM-dd')) {
            return date && format(parseISO(date), 'HH:mm')
        }
        else {
            return format(date, 'dd-MM-yyyy')
        }
    }

    const setSidebar = () => {
        dispatch(handleSidebar())
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
        formatedLastMessaeDate,
        loading,
        sidebar,
        setSidebar
        // getColor

    }
}

export default UseChatData
