import axios from "axios";

export const getChatMessageAPI = async ({ chatId, receiverId }) => {
    // let data = JSON.stringify(chatData)
// console.log("reciver Id is :",receiverId);

    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `http://localhost:3000/api/chat/message/${chatId}?receiverId=${receiverId}`,
        headers: {
            'Content-Type': 'application/json',
        },

        // data: data
    };

    try {
        const response = await axios.request(config)
        return response.data
    } catch (error) {
        console.error(error)
    }

}



export const addChatMessageAPI = async (messageData) => {
    let data = JSON.stringify({ message: messageData.message })

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `http://localhost:3000/api/chat/message/${messageData.chatId}`,
        headers: {
            'Content-Type': 'application/json',
        },
        data: data
    };

    try {
        const response = await axios.request(config)
        return response.data
    } catch (error) {
        console.error(error)
    }

}

