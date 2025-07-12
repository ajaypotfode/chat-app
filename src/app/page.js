"use client"
import AddChat from "@/components/AddChat";
import ChatBox from "@/components/ChatBox";
import Sidebar from "@/components/Sidebar";
import UseAuthData from "@/hooks/useAuthData";
import UseChatData from "@/hooks/useChatData";
import UseMessageData from "@/hooks/useMessageData";
import { clearUnseenMessageCount, getLastMessageDate, getUnseenMessageCount } from "@/redux/slice/chatSlice";
import { getSocketMessage } from "@/redux/slice/messageSlice";
import { useEffect } from "react";
import socket from '@/utils/clientSocket'
import { useDispatch } from "react-redux";
import { useSession } from "next-auth/react";
import Profile from "@/components/Profile";
import { FormSpinner } from "@/components/Loaders";
// import Image from "next/image";

export default function Home() {
  const { handleChataData, handleChatForm, fetchChatData, generateChat, handleDeleteChat, chatData, chatForm, chats, formatedLastMessaeDate, loading, sidebar, setSidebar } = UseChatData()
  const { fetchMessageData, addMessageData, messages, messageData, socketMessage, currentChat, handleMessageData } = UseMessageData()

  const dispatch = useDispatch()
  const { data: session, status } = useSession()


  useEffect(() => {
    if (!chats || chats.length === 0) return;

    chats.forEach(chat => {
      socket.emit('join-chat', chat._id)
    });

  }, [chats])


  useEffect(() => {
    if (status !== 'authenticated') return

    // console.log("session User Is :", session.user?.userId);

    socket.on('private-message', (message) => {
      dispatch(getSocketMessage(message))

      // console.log("message sender :",message.sender!==session.user?.userId);

      if (message.sender?.toString() !== session.user?.userId?.toString()) {
        dispatch(getUnseenMessageCount({ count: 1, chatId: message.chatId }))
      }
    });

    socket.on("chat-data", (chatData) => {
      dispatch(getLastMessageDate(chatData))
    })

    return () => {
      socket.off('private-message');
      socket.off('chat-data')
    };
  }, [session])




  return (
    <div className="h-screen overflow-y-hidden">
      <div className="flex h-full">
        <Sidebar
          handleChatForm={handleChatForm}
          chats={chats}
          handleDeleteChat={handleDeleteChat}
          fetchChatData={fetchChatData}
          fetchMessages={fetchMessageData}
          // logoutUser={getUserLogout}
          currentUser={session?.user}
          formatedLastMessaeDate={formatedLastMessaeDate}
          loading={loading}
          sidebar={sidebar}
          setSidebar={setSidebar}
        // getColor={getColor}
        />
        <ChatBox
          // fetchMessageData={ }
          addMessageData={addMessageData}
          messageData={messageData}
          messages={messages}
          handleMessageData={handleMessageData}
          socketMessage={socketMessage}
          currentUser={session?.user?.userId}
          currentChat={currentChat}
          setSidebar={setSidebar}

        />

        {
          chatForm === 'addChat' && <AddChat
            handleChatForm={handleChatForm}
            generateChat={generateChat}
            chatData={chatData}
            handleChataData={handleChataData}
            loading={loading}
          />
        }
        {
          chatForm === 'profile' && <Profile handlechatForm={handleChatForm} loading={loading} />
        }
      </div>
    </div>

  );
}
