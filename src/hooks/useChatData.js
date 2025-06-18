"use client"
import { addChats, deleteChat, getChatData, getchatForm, getChats, getUsers } from "@/redux/slice/chatSlice";
import { format, parseISO } from "date-fns";
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify";

const UseChatData = () => {
    const { chatData, chats, chatForm } = useSelector((state) => state.chats)
    const dispatch = useDispatch();



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


    const getColor = () => {
        const colors = ['[#ff5c5c]', '[#00ff7b]', '[#00d0ff]', '[#a200ff]', '[#ff00c8]', '[#91ff00]'];
        const index = Math.floor(Math.random() * colors.length)
        return colors[index]
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
        // getColor

    }
}

export default UseChatData
