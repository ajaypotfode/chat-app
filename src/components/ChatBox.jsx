"use client"
import { getSocketMessage } from '@/redux/slice/messageSlice'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import socket from '@/utils/clientSocket'

const ChatBox = ({ fetchMessageData, addMessageData, messages, messageData, currentChat, handleMessageData }) => {
    const { data: session, status } = useSession()
    const dispatch = useDispatch()
    // const [selectedChatId, setSelectedChatId] = useState(null);


    useEffect(() => {
        if (status !== 'authenticated') return;
        // const logedInUser = session?.user?.userId

        socket.emit('join-chat', currentChat.chatId)

        const handleMessage = (message) => {
            dispatch(getSocketMessage(message))
        }
        socket.on('private-message', handleMessage);

        return () => {
            socket.off('private-message', handleMessage);
        };
    }, [session,])


    return (
        <div className="flex-1 flex flex-col bg-[#141518]">
            {
                messages && messages.map((message, index) => (
                    <>
                        <div className="px-6 py-4 border-b border-[#2b2d3a] text-white font-medium">
                            {message.receiverId?.userName}
                        </div>
                        <div className="flex-1 overflow-y-auto p-6 space-y-4">

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
                    </>
                ))
            }
        </div>
    )
}

export default ChatBox