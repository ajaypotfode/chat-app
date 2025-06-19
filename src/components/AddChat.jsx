import React from 'react'
import { FormSpinner } from './Loaders'

const AddChat = ({ handleChatForm, generateChat, chatData, handleChataData, loading }) => {
  return (
    <div className="add-chat-User_form fixed inset-0 flex items-center justify-center bg-black/50 p-4 z-30" onClick={() => handleChatForm(null)}>
      {/* <div className="min-h-screen bg-[#1E1E1E] flex items-center justify-center"> */}
      {
        loading['addChats'] ? <FormSpinner />
          : (
            <div className="bg-[#2A2A2A] p-8 rounded-2xl w-full max-w-md shadow-lg" onClick={(e) => e.stopPropagation()}>
              <h2 className="text-white text-2xl font-semibold mb-6 text-center">Add User</h2>
              <form className="space-y-4" onSubmit={generateChat}>
                <input
                  type="email"
                  placeholder="Email"
                  name='email'
                  onChange={handleChataData}
                  value={chatData.email || ""}
                  className="w-full p-3 rounded-lg bg-[#1E1E1E] text-white border border-[#444] focus:outline-none"
                />
                <button
                  type="submit"
                  className="w-full bg-[#F25C5C] text-white py-3 rounded-lg hover:bg-[#e04b4b] transition"
                >
                  Add User
                </button>
              </form>
            </div>
          )
      }
      {/* </div> */}
    </div>
  )
}

export default AddChat