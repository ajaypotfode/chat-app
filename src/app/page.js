"use client"
import AddChat from "@/components/AddChat";
import ChatBox from "@/components/ChatBox";
import Sidebar from "@/components/Sidebar";
import UseAuthData from "@/hooks/useAuthData";
import UseChatData from "@/hooks/useChatData";
import UseMessageData from "@/hooks/useMessageData";
// import Image from "next/image";

export default function Home() {
  const { handleChataData, handleChatForm, fetchChatData, generateChat, handleDeleteChat, chatData, chatForm, chats, } = UseChatData()
  const { fetchMessageData, addMessageData, messages, messageData, socketMessage,currentChat, handleMessageData } = UseMessageData()
  const { getUserLogout } = UseAuthData()
  return (
    <div className="flex h-screen">
      <Sidebar
        handleChatForm={handleChatForm}
        chats={chats}
        handleDeleteChat={handleDeleteChat}
        fetchChatData={fetchChatData}
        fetchMessages={fetchMessageData}
        logoutUser={getUserLogout}
      />
      <ChatBox
        // fetchMessageData={ }
        addMessageData={addMessageData}
        messageData={messageData}
        messages={messages}
        handleMessageData={handleMessageData} 
        socketMessage={socketMessage}
        currentChat={currentChat}
        />

      {
        chatForm && <AddChat
          handleChatForm={handleChatForm}
          generateChat={generateChat}
          chatData={chatData}
          handleChataData={handleChataData}
        />
      }
    </div>

  );
}
