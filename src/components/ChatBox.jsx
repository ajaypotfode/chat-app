"use client"

import { clearUnseenMessageCount } from "@/redux/slice/chatSlice"
import { clearBackendUnseenMessageCount } from "@/redux/slice/messageSlice"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import EmptyChat from "./EmptyChat"


const ChatBox = ({ addMessageData, messages, messageData, currentChat, handleMessageData, currentUser, setSidebar }) => {
    const dispatch = useDispatch()

    useEffect(() => {
        if (currentUser !== currentChat.receiverId) {
            dispatch(clearUnseenMessageCount(currentChat.chatId))
        }

        if (messages.length && currentUser !== currentChat.receiverId) {
            dispatch(clearBackendUnseenMessageCount(currentChat.chatId))
        }

    }, [messages])

    return (
        // {
        messages.length > 0 ? messages.map((message, index) => (
            <>
                <div className=" flex-1 flex flex-col bg-[#141518]" key={index}>
                    <div className="px-6 py-4 border-b border-[#2b2d3a] text-white font-medium flex items-start " >
                        <button className="md:hidden text-white text-3xl font-bold mr-5" onClick={setSidebar}>
                            <i className="bi bi-arrow-left"></i>
                        </button>
                        <div className="flex flex-col">
                            <p> {message.receiverId?.userName}</p>
                            <p className="text-xs text-gray-400 slide-text "> {message.receiverId?.bio}</p>
                        </div>
                    </div>
                    <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar pb-28">
                        {
                            message.messages?.map((text, index) => (
                                (message.receiverId?._id === text.sender)
                                    ? (<div className="flex items-end gap-2" key={index}>
                                        <div className="bg-[#ff5c5c] text-white px-4 py-2 rounded-2xl rounded-bl-none text-sm">
                                            {text.content}
                                        </div>
                                    </div>)
                                    : (<div className="flex justify-end" key={index}>
                                        <div className="bg-[#2b2d3a] text-white px-4 py-2 rounded-2xl rounded-br-none text-sm">
                                            {text.content}
                                        </div>
                                    </div>)
                            ))}
                    </div>
                    <div className="p-4 border-t border-[#2b2d3a] flex items-center gap-2">
                        <input
                            type="text"
                            placeholder="Enter Message..."
                            name='message'
                            value={messageData.message || ""}
                            onChange={handleMessageData}
                            className="flex-1 bg-[#2b2d3a] text-white p-2 rounded-lg placeholder:text-gray-400 outline-none"
                        />
                        <button className="bg-[#ff5c5c] p-2 rounded-lg text-white" onClick={() => addMessageData(message.chatId, message.receiverId?._id)} >Send</button>
                    </div>
                </div>
            </>
        )) : <EmptyChat setSidebar={setSidebar} />
    )
}

export default ChatBox