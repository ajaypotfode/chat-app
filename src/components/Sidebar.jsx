"use client"

import { useEffect } from "react";

export default function Sidebar({ handleChatForm, chats, fetchChatData, fetchMessages, logoutUser, currentUser, formatedLastMessaeDate }) {

    useEffect(() => {
        fetchChatData()
    }, [])


    return (
        <div className="flex h-screen">
            <div className="w-80 h-full bg-[#1e1f26] text-white flex flex-col">
                <div className="p-4 flex justify-between items-center">
                    {/* <div> */}
                    {/* {console.log("current User is :", currentUser)
                        } */}
                    <span
                        onClick={() => handleChatForm('profile')}
                        className="w-10 h-10 rounded-full border text-center place-content-center bg-[#ff5c5c] font-bold cursor-pointer"
                    >
                        {currentUser?.username[0]}
                    </span>
                    <div className="ml-3">
                        <button className="text-4xl text-gray-400  cursor-pointer" onClick={() => handleChatForm('addChat')}>
                            <i className="bi bi-plus-lg"></i>
                        </button>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto">
                    <div className="px-4 space-y-4">
                        <h4 className="text-sm text-gray-400">Recent</h4>
                        {
                            chats && chats.map((chat, index) => (


                                <div className="flex items-center justify-between cursor-pointer" key={index}>
                                    {/* {console.log("chat Color:", chat.color)} */}
                                    <div className="flex items-center gap-2">
                                        <span className={`w-10 h-10 rounded-full border text-center place-content-center font-bold`} /* style={{ backgroundColor: chat?.color }}*/ >{chat?.reciever?.userName[0]}</span>
                                        <div onClick={() => fetchMessages({ chatId: chat._id, receiverId: chat.reciever?._id },)}>
                                            <p className="font-medium text-white">{chat.reciever?.userName}</p>
                                            <p className="text-xs text-gray-400">{chat.reciever?.bio}</p>
                                        </div>
                                    </div>
                                    <div className="text-xs text-gray-400 flex flex-col items-end">
                                        <p>
                                            {chat.lastMessageDate && formatedLastMessaeDate(chat.lastMessageDate)}
                                        </p>
                                        <p className="bg-[#ff5c5c] text-white text-sm w-fit h-fit rounded-full px-1">{chat.unseenCount > 0 && chat.unseenCount}</p>
                                    </div>
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
