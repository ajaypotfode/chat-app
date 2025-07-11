"use client"

import { useEffect } from "react";
import { PageSpinner } from "./Loaders";

export default function Sidebar({
    handleChatForm,
    chats,
    fetchChatData,
    fetchMessages,
    currentUser,
    loading,
    formatedLastMessaeDate,
    sidebar,
    setSidebar }) {

    useEffect(() => {
        fetchChatData()
    }, [])


    return (
        // <div className="flex h-screen">
        <div
            className={`sidebar flex flex-col  h-screen"
            transform ${sidebar ? "" : "inActive"} transition-transform duration-300 ease-in-out 
          w-80 h-screen max-h-screen  z-10`}
        >
            <div className="h-full bg-[#1e1f26] text-white flex flex-col relative">
                <button className="md:hidden absolute right-0 top-0 text-red-800 text-2xl" onClick={setSidebar}>
                    <i className="bi bi-toggle-on"></i>
                </button>
                <div className="md:p-4 p-3 flex justify-between items-center md:mt-0 mt-6">

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

                <div className="flex-1 overflow-y-auto pb-10">
                    <div className="px-4 space-y-4 w-[300px]">
                        <h4 className="text-sm text-gray-400">Recent</h4>
                        {
                            loading['getChats'] ? <PageSpinner /> :
                                (
                                    chats && chats.map((chat, index) => (
                                        <div className="flex items-center justify-between cursor-pointer w-full" key={index}>
                                            {/* {console.log("chat Color:", chat.color)} */}
                                            <div className="flex items-center gap-2">
                                                <span className={`w-10 h-10 rounded-full border text-center place-content-center font-bold`} style={{ backgroundColor: chat?.color }}>{chat?.reciever?.userName[0]}</span>
                                                <div onClick={() =>{
                                                     fetchMessages({ chatId: chat._id, receiverId: chat.reciever?._id })
                                                     setSidebar()
                                                }}>
                                                    <p className="font-medium text-white">{chat.reciever?.userName}</p>
                                                    <p className="text-xs text-gray-400 truncate w-40 ">{chat.reciever?.bio}</p>
                                                </div>
                                            </div>
                                            <div className="text-xs text-gray-400 flex flex-col items-end whitespace-nowrap">
                                                <p>
                                                    {chat.lastMessageDate && formatedLastMessaeDate(chat.lastMessageDate)}
                                                    {/* 12-02-2025 */}
                                                </p>
                                                <p className="bg-[#ff5c5c] text-white text-sm w-fit h-fit rounded-full px-1">{chat.unseenCount > 0 && chat.unseenCount}</p>
                                            </div>
                                            {/* <span className="text-xs text-gray-400">05 min</span> */}
                                        </div>
                                    ))
                                )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}
