import axios from "axios";

export const signupUserAPI = async (userData) => {
    let data = JSON.stringify(userData);

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://localhost:3000/api/sign-up',
        headers: {
            'Content-Type': 'application/json',
        },
        data: data
    };

    try {
        const response = await axios.request(config)
        return response.data
    } catch (error) {
        console.error(error);
    }

}