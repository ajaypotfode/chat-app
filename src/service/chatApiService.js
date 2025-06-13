import axios from "axios";

export const getChatAPI = async () => {

    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'http://localhost:3000/api/chat',
        headers: {
            'Content-Type': 'application/json',
        }
    };

    try {
        const response = await axios.request(config)
        // console.log("responsr from api :", response);

        return response.data
    } catch (error) {
        console.error(error)
    }

}


export const addChatAPI = async (chatData) => {
    let data = JSON.stringify(chatData)

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://localhost:3000/api/chat',
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

export const deleteChatAPI = async (chatId) => {
    let data = JSON.stringify(chatId)

    let config = {
        method: 'delete',
        maxBodyLength: Infinity,
        url: 'http://localhost:3000/api/chat',
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


export const getUsersAPI = async (userData) => {
    // let data = JSON.stringify(userData)
    // console.log("user Api :",data);

    try {
        const response = await axios.get('/api/sign-up', {
            params: userData
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching chat:', error);
    }
}

// export const getChatAPI = async () => {
//     try {
//         const response = await axios.get('/api/chat');
//         return response.data;
//     } catch (error) {
//         console.error('Error fetching chat:', error);
//     }
// };



// export const addChatAPI = async (chatData) => {
//     let data = JSON.stringify(chatData)

//     try {
//         const response = await axios.post('/api/chat',data);
//         return response.data;
//     } catch (error) {
//         console.error('Error fetching chat:', error);
//     }
// };


