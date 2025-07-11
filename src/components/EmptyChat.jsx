import Image from 'next/image'
import React from 'react'

const EmptyChat = ({ setSidebar }) => {
    return (
        <div className=" flex-1 flex flex-col bg-[#141518] justify-center items-center">
            <button className="md:hidden absolute left-4 top-4 text-white text-3xl font-bold" onClick={setSidebar}>
                <i className="bi bi-arrow-left"></i>
            </button>
            <div className='empty_chat-image flex flex-col justify-center items-center'>
                <Image src='/images/chat-app.png' alt='chat-Box' height={60} width={90} />
                <p className='text-2xl'>Real Time Chat Application</p>
                {/* <img src="" alt="" /> */}
            </div>
        </div>
    )
}

export default EmptyChat