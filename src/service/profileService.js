import axios from "axios";

export const getProfileDataAPI = async () => {
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `/api/profile`,
        headers: {
            'Content-Type': 'application/json',
        },

    };

    try {
        const response = await axios.request(config)
        console.log("profileData is :",response.data);
        
        return response.data
    } catch (error) {
        console.error(error)
    }

}



export const updateBioAPI = async (bio) => {
    let data = JSON.stringify({ bio })

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `/api/change-bio`,
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