import axios from "axios";

export const getChatMessageAPI = async ({ chatId, receiverId }) => {
    // let data = JSON.stringify(chatData)
    // console.log("reciver Id is :",receiverId);

    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `/api/chat/message/${chatId}?receiverId=${receiverId}`,
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
        url: `/api/chat/message/${messageData.chatId}`,
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

export const clearUnseenMessageAPI = async (chatId) => {
    // let data = JSON.stringify({ message: messageData.message })
// console.log("call Clear Unseen ");

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `/api/chat/message/clearunseen-message?chatId=${chatId}`,
        headers: {
            'Content-Type': 'application/json',
        }
    };

    try {
        const response = await axios.request(config)
        return response.data
    } catch (error) {
        console.error(error)
    }
}