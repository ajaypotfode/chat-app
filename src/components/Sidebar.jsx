"use client"

import { useEffect } from "react";

export default function Sidebar({ handleChatForm, chats, handleDeleteChat, fetchChatData, fetchMessages, logoutUser }) {

    useEffect(() => {
        fetchChatData()
    }, [])


    return (
        <div className="flex h-screen">
            <div className="w-80 h-full bg-[#1e1f26] text-white flex flex-col">
                <div className="p-4 flex justify-between items-center">
                    <div className="bg-[#2b2d3a] flex items-center px-3 py-2 rounded-lg">
                        <button
                            className="bg-transparent text-sm outline-none w-full placeholder:text-gray-400"
                            onClick={logoutUser}
                        >
                            LogOut
                        </button>
                    </div>
                    <div className="ml-3">
                        <button className="text-4xl text-gray-400  cursor-pointer" onClick={handleChatForm}>
                            <i className="bi bi-plus-lg"></i>
                        </button>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto">
                    <div className="px-4 space-y-4">
                        <h4 className="text-sm text-gray-400">Recent</h4>
                        {
                            chats && chats.map((chat, index) => (
                                <div className="flex items-center justify-between" key={index}>
                                    <div className="flex items-center gap-2">
                                        <img src="/users/patrick.jpg" className="w-10 h-10 rounded-full" />
                                        <div onClick={() => fetchMessages({ chatId: chat._id, receiverId: chat.reciever?._id },)}>
                                            <p className="font-medium text-white">{chat.reciever?.userName}</p>
                                            <p className="text-xs text-gray-400">Hey! there I'm available</p>
                                        </div>
                                    </div>
                                    <button className="text-md text-red-500" onClick={() => handleDeleteChat({ chatId: chat._id })}>
                                        <i className="bi bi-trash3-fill"></i>
                                    </button>
                                    {/* <span className="text-xs text-gray-400">05 min</span> */}
                                </div>
                            ))
                        }

                    </div>
                </div>
            </div>
        </div>
    );
}
